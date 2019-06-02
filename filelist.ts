import * as React from 'react';
import * as style from './style.less';
import RightMenu from 'app/components/RightMenu';
import { encodeSearch, decodeSearch, timeSpanFormat, fileType } from 'common/js/Util';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { HomeLayoutActions } from 'app/actions';
import { omit } from 'app/utils';
const { message } = require('antd');
import service from './service';
import serviceMove from 'duotools/MoveToModal/service';
import serviceRight from '../../RightMenu/service';
import * as seviceTrash from '../../../../service/recycled';
import { history } from 'service/his';
import Renderlist from 'app/components/main/FileList/RenderList';
import CooperateShare from 'duotools/CooperateShare';
import MoveToModal from 'duotools/MoveToModal';
import cx from 'classnames';
import { findDOMNode } from 'react-dom';
import DargIcon from 'app/components/main/FileList/DargIcon';
import { fileIconMap, iconMap } from './service';
import MessageInfo from 'app/components/base/MessageInfo';
import { Loading } from 'app/components/loading';
import LazyScroll from 'app/components/base/LazyScroll';
import ModalCon from 'app/components/base/ModalCon';
import OperateBar from 'app/components/main/OperateBar';
import { themeColor } from 'common/js/constant';

namespace FileList {
  export interface FileList {
    [propName: string]: any;
    children?: any;
    getData?: any;
    form?: any;
    router?: any;
    tableConfig?: any;
  }
}
//let root = document.getElementById('dummy-container');
@connect(
  (store: any) => {
    return {
      tableConfig: store.homeLayout.tableConfig,
      operation: store.homeLayout.operation,
      isShowModal: store.homeLayout.isShowModal,
      data: store.homeLayout.data || [],
      loading: store.homeLayout.loading,
      createFile: store.personInfo.createFile,
      toast: store.personInfo.toast,
      currRow: store.homeLayout.currRow,
      auth: store.auth,
      personInfo: store.personInfo
    };
  },
  (dispatch: Dispatch) => {
    return {
      actions: { ...bindActionCreators(omit(HomeLayoutActions, 'Type'), dispatch) },
      dispatch
    };
  }
)
export default class FileList extends React.Component<FileList.FileList, any> {
  sensors = (window as any).sensors;
  isClose = false;
  editableRight = false;
  selectedAreaRef:any = React.createRef()
  posArr:any = []
  constructor(props: any, context?: any) {
    super(props, context);
    this.state = {
      editingRow: {},
      visible: false,
      data: [],
      selList: [],
      startX: 0,
      startY: 0,
      fileStartY: 0,
      fileEndY: 0,
      moveX: 0,
      moveY: 0,
      isSelect: false,
      showMes: false,
      timeoutv: '',
      isdrop: false,
      isScroll: false,
      scrollheight: 0,
      showModalTip: false,
      fileIds: {},
      tipResult: '',
      targetFileName: '',
      isowner: true,
      isLoading: true,
      // 区别手抖长点与框选,有bug后期优化
      // needJudgeDistance: false,
    };
    this.renderGroupTable = this.renderGroupTable.bind(this);
    this.groupByDate = this.groupByDate.bind(this);
    this.fileNameChange = this.fileNameChange.bind(this);
    this.cancelEditFolder = this.cancelEditFolder.bind(this);
    this.toggleSel = this.toggleSel.bind(this);
    this.fileClick = this.fileClick.bind(this);
    this.setVisibleHandle = this.setVisibleHandle.bind(this);
    this.recoverFileFromTrashHandle = this.recoverFileFromTrashHandle.bind(this);
    this.switchChange = this.switchChange.bind(this);
    this.getTableList = this.getTableList.bind(this);
    this.switchChangeRe = this.switchChangeRe.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.changeState = this.changeState.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toTargetFolder = this.toTargetFolder.bind(this);
    this.loadingMoreData = this.loadingMoreData.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.goTop = this.goTop.bind(this);
    this.scrollHandler = this.scrollHandler.bind(this);
    this.getList = this.getList.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleok = this.handleok.bind(this);
    this.cutFileName = this.cutFileName.bind(this);
    this.countStringByChineseMode = this.countStringByChineseMode.bind(this);
    this.isContainChinese = this.isContainChinese.bind(this);
  }
  
  componentDidMount() {
    this.distinctId();
    let params = decodeSearch();

    // 默认刚进来的时候如果是按照标题排序则文件夹置顶
    params = {
      ...params,
      folder_top: params.order_by === 'title' || (location.pathname === '/home' && location.search === ''),
    }
    
    // 处理在新标签页打开新页面和登录后记录之前的显示设置
    const fileListShowDetail = JSON.parse((localStorage.getItem('fileListShowDetail') as any || '{}'))
    if (JSON.stringify(fileListShowDetail) === '{}') {
      // 保证一开始所有的 tab 下文件列表都是列表展示
      localStorage.setItem('fileListShowDetail', JSON.stringify({
        default: {layout: 'list'},
        collabshare: {layout: 'list'},
        starred: {layout: 'list'},
        recent: {layout: 'list'},
        recycled: {layout: 'list'},
      }))
    } else if (!params.origin) {
      const showSetting = fileListShowDetail['default'] || {}
      params = {
        ...params,
        ...showSetting,
      }
    }
    
    let {
      actions: { setTableConfig },
      tableConfig
    } = this.props;
    setTableConfig(_.merge(tableConfig, params ));
    this.getTableList();
    let classObj: any = document.querySelectorAll('input');
    for (let i = 0; i < classObj.length; i++) {
      classObj[i].addEventListener('dragstart', function(event: any) {
        event.preventDefault();
      });
    }
    window.addEventListener('storage', this.refreshList);
    window.addEventListener('keydown', this.srokey.bind(this));
  }

  componentWillReceiveProps(nextProps:any) {
    if (nextProps.loading) {
      this.setState({
        isLoading: true,
        visible: false,
      })
    } else {
      this.setState({
        isLoading: false,
        visible: false,
      })
    }
  }

  componentWillUnmount() {
    this.props.actions.execOperation({ operation: null });
    window.removeEventListener('storage', this.refreshList);
    window.removeEventListener('keydown', this.srokey);
  }

  getList() {
    let params = {
      ...this.props.tableConfig,
      next_page_token: 0
    };
    this.props.dispatch({
      type: 'FETCH_HOME_LIST_REQUEST',
      payload: params
    });
  }

  distinctId() {
    let { personInfo } = this.props;
    let userId = personInfo.id;
    this.sensors.login(userId);
  }

  goTop() {
    let right: any = document.getElementById('right');
    right.scrollTop = 0;
  }

  scrollHandler() {
    let right = document.getElementById('right');
    if (right) {
      right.scrollTop += 20;
    }
  }

  isContainChinese(char: string): boolean {
    if (char) {
        var re = new RegExp("[\\u4E00-\\u9FFF]+$","g");
        return re.test(char);
    }
    return false;
  }

  countStringByChineseMode(str: string): number {
    let count: number = 0;
    if (str) {
        for (let i = 0; i < str.length; i++) {
            if (this.isContainChinese(str.charAt(i))) {
                count += 2;
            } else {
                count += 1;
            }
        }
    }
    return count;
  }

  refreshList(e: any) {
    if (e.key === 'listLastUpdated') {
      this.getTableList();
    }
  }
  srokey(e: any) {
    if (this.state.isSelect && (e.key == 'ArrowDown' || e.key == 'ArrowUp')) {
      e.preventDefault();
    }
  }
  loadingMoreData() {
    let {
      tableConfig,
      actions: { getTabListReq }
    } = this.props;
    getTabListReq({
      ...tableConfig,
      isLoadMore: true,
      next_page_token: tableConfig.next_page_token
    });
  }
  getTableList() {
    const params = { ...this.props.tableConfig, next_page_token: 0}
    this.props.actions.getTabListReq(params);
  }
  fileClick(row: any, isblank = false) {
    let { tableConfig, actions: { enterLoadingStatus } } = this.props;
    if (row.is_folder && !isblank) {
      enterLoadingStatus()
    }
    if (row.file_type === fileType.folder) {
      let params = {
        order_by: tableConfig.order_by,
        layout: tableConfig.layout,
        folder_top: tableConfig.folder_top,
        direction: tableConfig.direction,
        origin: 'default',
        parent_id: row.id,
        editable: row.permission.editable,
        is_collaborated: row.is_collaborated
      };
      let newParams = encodeSearch(params);
      this.props.actions.setCollaRights({permission: row.permission, is_collaborated: row.is_collaborated});
      if (isblank) {
        let a1 = document.createElement('a');
        a1.href = `${location.origin}${location.pathname}${newParams}`;
        a1.target = '_blank';
        a1.style.display = 'none';
        document.body.appendChild(a1);
        a1.click();
      } else {
        this.goTop();
        history.push({
          pathname: '/home',
          search: newParams
        } as any);
      }
    } else if (row.file_type === fileType.word) {
      let { editorDomain }: any = process.env.config;
      const domain = `${process.env.editorOrigin}${editorDomain}`
      var a = document.createElement('a');
      a.href = domain + `?file_id=${row.id}`;
      a.target = '_blank';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
    }
  }

  saveFolderName = async (e: any) => {
    // 允许输入表情及特殊字符
    {
      /*
    let matchres = regFileName(this.state.editingRow.title)
    if (matchres.isMatch) {
      message.error('文件名不能包含: \\\\ / : * ? " < > |  \\b  \\t emoji');
      return
    }
    */
    }
    if (this.state.editingRow.title) {
      var delspace = this.state.editingRow.title.replace(/(^\s*)|(\s*$)/g, '');
    }
    if (!delspace) {
      this.cancelEditFolder();
      return;
    } else {
      let { currRow } = this.props;
      let params = {
        title: delspace,
        id: currRow.id
      };
      const hide = message.loading('正在操作..', 0);

      let res = await service.editFileName(params);
      hide();
      if (res && !res.code) {
        this.getTableList();
        let olsel = this.state.selList.find((item1: any) => item1.id == currRow.id);
        if (olsel) {
          this.setState({
            selList: [{ ...olsel, title: delspace }]
          });
        }

        this.props.actions.execOperation({ operation: null });
        this.sensors.track('renameSuccess', {
          productName: '松果文档',
          versionType: '内测版本一'
        });
        message.success('文件名已经修改');
      }
    }
  };

  setOperation(operation: any, currRow: any) {
    this.props.actions.setCurrRow({ currRow });
    this.props.actions.execOperation({ operation });
  }

  fileNameChange(title: any) {
    const editingRow = { title };
    this.setState({ editingRow });
  }

  handleKeyDown(event: any) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!event.target.value) {
        this.cancelEditFolder();
      } else {
        this.saveFolderName(event);
      }
    }
    this.isClose = false;
  }
  cancelEditFolder() {
    let editingRow = {
      title: undefined
    };
    this.setState({ editingRow });
    this.props.actions.execOperation({ operation: null });
    this.isClose = true;
  }
  handleCancel() {
    this.setState({showModalTip: false});
    return;
  }
  handleok() {
    const params = this.state.fileIds;
    const { origin } = this.props.tableConfig;
    serviceMove.moveTo(params).then((res: any) => {
      if (res && res.code) {
        if ( res.code == 9 ) {
          message.error('你无权在只读文件夹中移出（移入）内容');
        } else if ( res.code == 3 && origin == 'default' ) {
          message.error('你已被所有者移除权限，不能继续访问此文件夹');
        } else if ( res.code == 3 && origin == 'starred' ) {
          message.error('选中的文件夹不被支持移动到下级文件夹中');
        }
      } else {
        let msg = (
          <span>
            <span>{'已将文件移动到' + this.state.targetFileName }</span>
          </span>
        );
        message.success(msg);
        this.getTableList();  
      } 
    }); 
  }
  cutFileName(folder_Name: any) {
    if ( folder_Name.length > 20 ) {
       return folder_Name.substr(0, 20) + '...';
    } else {
      return folder_Name
    }
  }
  // 框选拖动相关操作
  // 拖拽
   drop = (target: any) => async (e: any) => {
    document.ondragover = function() {};
    e.preventDefault();
    e.stopPropagation();
    const { origin, root_folderId } = this.props.tableConfig;
    e.currentTarget.setAttribute('style', '');
    let originFile = JSON.parse(e.dataTransfer.getData('origin'));
    let isOwn = originFile.some((item: any) => item.id == target.id);
    const parentId = originFile[0].parent_id;
    if (parentId == root_folderId ) {
        this.editableRight = true
    } else {
      let folderInfo = await service.getFileRight(parentId);
      let editableright = folderInfo.permission.editable;
      this.editableRight = editableright;
    }
    if (isOwn) {
      // message.info('已经在该文件夹下');
      return;
    }
    let params = {
      id: originFile.map((item: any) => item.id),
      folder_id: target.id
    };
    this.setState({fileIds: params});
    let targetFile: any = {
      is_collaboratedTarget: target.is_collaborated,
      is_folderTarget: target.is_folder,
      permissionTarget: target.permission
    } 
    let resTips = await serviceMove.moveFileTips(params);
    if ( resTips.result === 'MFT_UNKNOWN' || !this.editableRight){
      let re = await serviceMove.moveTo(params);
      if (re && re.code) {
        if ( re.code == 9 ) {
          message.error('你无权在只读文件夹中移出（移入）内容');
        } else if ( re.code == 3 && origin == 'default' ) {
          message.error('你已被所有者移除权限，不能继续访问此页');
        } else if ( re.code == 3 && origin == 'starred' ) {
          message.error('选中的文件夹不被支持移动到下级文件夹中');
        } 
      } else {
        let msg = (
          <span>
            <span>{'已将文件移动到' + target.title}</span>
            {/* <span style={{ color: '#29cc7a', marginLeft: '8px', cursor: 'pointer' }} onClick={() => this.toTargetFolder(target.id)}>查看</span> */}
          </span>
        );
        message.success(msg);
        // 埋点开始———————————————————————————————————————————————————————拖拽移动
        this.sensors.track('moveSuccess', { moveType: '拖拽移动' });
        // 分割线—————————————————————————————————————————————————————————埋点结束
      }
    } else {
      if (targetFile.permissionTarget.editable) {
        this.setState({
          showModalTip: true,
          tipResult: resTips.result,
          targetFileName: this.cutFileName(target.title)
        });
      } else {
        message.error('你无权在只读文件夹中移出（移入）内容');
      }
    } 
    this.getTableList();
  };

  toTargetFolder(targetId: any) {
    message.destroy();
    let { tableConfig } = this.props;
    let params = {
      order_by: tableConfig.order_by,
      layout: tableConfig.layout,
      folder_top: tableConfig.folder_top,
      direction: tableConfig.direction,
      parent_id: targetId,
      origin: 'default',
    };
    let newParams = encodeSearch(params);
    history.push({
      pathname: '/home',
      search: newParams
    } as any);
  }

  drag = (row: any, draggable: any) => (e: any) => {
    e.stopPropagation();
    if (!draggable) {
      e.preventDefault();
      return;
    }
    
    this.setState({ isdrop: true, isowner: row.role === "PROXY_ROLE_OWN" ? true : false});
    let editable = this.props.operation === 'Rename' && row.id === this.props.currRow.id;
    let isSelected = false;
    isSelected = this.state.selList.some((item: any) => item.id == row.id);
    let isSelecting = this.state.isSelect;
    if (editable && isSelecting && !isSelected) {
      e.preventDefault();
    }
    // 开始拖动关闭右键菜单
    let targetDoc = document.getElementById('rightMenu');
    targetDoc ? (targetDoc.style.display = 'none') : null;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
    let a = document.getElementById('void');
    e.dataTransfer.setDragImage(a, 0, 0);
    // e.preventDefault();
    e.dataTransfer.setData('origin', JSON.stringify(this.state.selList));
    // 为了火狐兼容....
    // console.log('bd')
    // document.addEventListener('dragover', this.setPos.bind(this), false)
    const that = this;
    document.ondragover = function(e) {
      that.setPos(e);
    };
  };
  setPos = (e: any) => {
    let DargIconDom: any;
    DargIconDom = findDOMNode(this.refs.DargIcon);
    DargIconDom.style.left = e.clientX - 5 + 'px';
    DargIconDom.style.top = e.clientY - 5 + 'px';
  };

  draging = (row: any) => (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };
  dragEnd = (row: any) => (e: any) => {
    e.stopPropagation();
    let DargIconDom: any;
    DargIconDom = findDOMNode(this.refs.DargIcon);
    DargIconDom.style.left = -999 + 'px';
    DargIconDom.style.top = -999 + 'px';
    document.ondragover = function() {};
    this.setState({ isdrop: false });
  };
  allowDrop = (row: any, isSelected: boolean) => (e: any) => {
    const { mainColor } = themeColor;
    e.stopPropagation();
    if (row.file_type == fileType.folder) {
      e.preventDefault();
      e.currentTarget.setAttribute(
        'style',
        this.props.tableConfig.layout == 'list'
          ? 'background: rgb(246, 245, 250)'
          : `border: 1px solid ${mainColor}`
      );
    } 
  };
  dragLeave = (row: any) => (e: any) => {
    e.currentTarget.setAttribute('style', '');
  };
  // 框选
  handlerMouse = (e: any) => {
    this.setState({
      isSelect: false,
      isScroll: false,
      startX: 0,
      startY: 0,
      fileStartY: 0,
      fileEndY: 0,
      moveX: 0,
      moveY: 0,
    });
  };

  onMouseDown(e: any) {
    e.stopPropagation();
    document.addEventListener('mouseup', this.handlerMouse, false);
    if (e.button != 0 || e.shiftKey || this.props.operation) return;
    const domAll: any = document.querySelectorAll('div[data-name]');
    const container = document.querySelector('div[class^=container__]') as HTMLDivElement
    console.log({
      startX: e.clientX,
      startY: e.clientY,
      fileStartY: e.clientY + container.scrollTop - 80,
    })
    domAll.forEach((item:any) => {
      this.posArr.push({
        id: item.dataset.name,
        offsetWidth: item.offsetWidth,
        offsetHeight: item.offsetHeight,
        offsetTop: item.offsetTop,
        offsetLeft: item.offsetLeft
      });
    })

    this.setState({
      startX: e.clientX,
      startY: e.clientY, // 初始距离文件列表顶部的距离
      fileStartY: e.clientY + container.scrollTop - 80,
      selList: [],
      isScroll: true,
      isSelect: true,
    });
  }

  onMouseMove(evt: any) {
    evt.stopPropagation();
    const container = document.querySelector('div[class^=container__]') as HTMLDivElement
    const { startX, startY, isSelect } = this.state;
    if (!isSelect) return
    // 鼠标在客户端中的位置
    let clientX = evt.clientX;
    let clientY = evt.clientY;
    let newFileY = evt.clientY + container.scrollTop - 80;
    console.log(newFileY)
    //多选页面随之滚动
    if (clientY > document.body.clientHeight - 10 && this.state.isScroll) {
      console.log(document.body.clientHeight);
      this.scrollHandler();
      const right = document.getElementById('right');
      if (right) {
        clientY = clientY + right.scrollTop;
        this.setState({ startY: this.state.startY - right.scrollTop });
      }
    } 
    
    let mbsx = Math.abs(clientX - startX);
    let mbsy = Math.abs(clientY - startY);
 
    if (startX && startY && (mbsx > 0 || mbsy > 0)) {
      this.setState({
          moveX: clientX,
          moveY: clientY,
          fileEndY: newFileY,
          isSelect: true
      }, this.getSelectedFile);
    }
  }

  getSelectedFile = () => {
    const { data } = this.props
    const { fileEndY, fileStartY } = this.state
    let selList: any = [];
    this.posArr.forEach((item: any, i: any) => {
      const minFileY = Math.min(fileStartY, fileEndY)
      const maxFileY = Math.max(fileStartY, fileEndY)
      if ((item.offsetTop > minFileY && item.offsetTop < maxFileY) 
        || (item.offsetTop > fileStartY && item.offsetTop - fileStartY < 52)
        || (item.offsetTop < fileEndY && fileEndY - item.offsetTop < 52)
      ) {
        selList.push(data.find((item1: any) => item1.id == item.id));
      }
    });
    this.setState({
      selList,
    });
  }
  // 重写框选
  
  // 

  toggleSel(e: any, isSelected: any, row: any) {
    let { selList } = this.state;
    if (e.shiftKey) {
      if (isSelected) {
        let a = selList && selList.filter((item: any) => item.id != row.id);
        this.setState({
          selList: a
        });
      } else {
        this.setState({
          selList: selList.concat([row])
        });
      }
    } else {
      this.setState({
        selList: [row]
      });
    }
  }

  renderGroupTable(rows: any, listProps: any) {
    let { layout } = this.props.tableConfig;
    let groupRows = this.groupByDate(rows);
    let firstGroup = true
    const orderArray = ['今天', '昨天', '一周内', '一个月内', '更早']
    return orderArray.map((group: string, index: number) => {
      rows = groupRows[group];
      if (rows === undefined) return
      const renderGroup = (
        <div key={group} className={style.group}>
          <div
            className={cx(style. groupTitle, firstGroup && style.firstGroup)}
            style={layout == 'flat' ? { margin: '25px 0 10px 0' } : {}}
          >
            {group}
          </div>
          <Renderlist {...listProps} rows={rows} />
        </div>
      );
      firstGroup = false
      return renderGroup
    });
  }

  handler = (e: any) => {
    // 兼容火狐
    if (e.button == '2') return;

    let targetDoc = document.getElementById('rightMenu');
    targetDoc ? (targetDoc.style.display = 'none') : null;
    document.removeEventListener('click', this.handler, false);
  };

  getCoordinate = (row: any) => (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.actions.execOperation({ operation: null });
    this.props.actions.setCurrRow({ currRow: row })
    e.nativeEvent.stopImmediatePropagation();
    let _this = this;
    let targetDoc: any = document.getElementById('rightMenu');
    this.setState({
      selList: [this.props.data.find((item1: any) => item1.id == row.id)]
    });
    if (targetDoc) {
      targetDoc.style.display = 'block';
      let _x = 220;
      let _y = row.is_folder ? 283 : 410;
      let fixedX = window.innerWidth - e.clientX < _x ? _x : 0;
      // let fixedX = window.innerWidth - e.clientX < targetDoc.offsetWidth ? targetDoc.offsetWidth : 0;
      let fixedY = window.innerHeight - e.clientY < _y && e.clientY > _y ? _y : 0;
      let left = e.clientX - fixedX - 230 + 'px';
      let top = e.clientY - 54 - fixedY + 'px';
      targetDoc.style.position = 'absolute';
      targetDoc.style.zIndex = '9999';
      targetDoc.style.left = left;
      targetDoc.style.top = top;
    }
    document.addEventListener('click', this.handler, false);
    setTimeout(() => {
      _this.setState({
        visible: true
      });
    }, 200);
  };

  groupByDate(rows: any) {
    const { origin, order_by } = this.props.tableConfig;
    let groupedRows = rows.reduce((res: any, row: any) => {
      // 距离今天多久，eg：今天，一个月内
      let groupName = timeSpanFormat(
        origin != 'recent'
          ? order_by != 'create_time'
            ? row.last_used_at
            : row.create_time
          : row.update_time
      );
      if (typeof res[groupName] == 'undefined') {
        res[groupName] = [row];
      } else {
        res[groupName].push(row);
      }
      return res;
    }, {});
    return groupedRows;
  }

  renderList(grouped: any, rows: any, listProps: any) {
    const origin = this.props.tableConfig.origin;
    return origin=='recent' ? (
      this.renderGroupTable(rows, listProps)
    ) : (
      <Renderlist {...listProps} rows={rows} />
    );
  }

  fileTypeGroup(grouped: any, rows: any, listProps: any) {
    const layout = this.props.tableConfig.layout;
    let folderList = rows && rows.filter((row: any) => row.file_type == fileType.folder);
    let fileList = rows && rows.filter((row: any) => row.file_type != fileType.folder);
    return (
      <div>
        {folderList && folderList.length ? (
          <div
            className={grouped ? style.groupFileTitle : style.fileTitle}
            style={layout == 'flat' ? { border: 'none' } : {}}
          />
        ) : null}
        {this.renderList(false, folderList, listProps)}
        {fileList.length ? (
          <div
            className={grouped ? style.groupFileTitle : style.fileTitle}
            style={layout == 'flat' ? { border: 'none' } : {}}
          />
        ) : null}
        {this.renderList(grouped, fileList, listProps)}
      </div>
    );
  }

  setVisibleHandle(visible: any) {
    this.setState({
      visible
    });
  }

  recoverFileFromTrashHandle() {
    const { currRow, tableConfig } = this.props;

    const params = {
      id: [currRow.id]
    };
    seviceTrash.recoverFileFromTrash([params]).then((res: any) => {
      if (!res.code) {
        message.success('撤销成功');
        this.props.dispatch({
          type: 'res_setVisible',
          payload: {
            toast: false
          }
        });
        clearTimeout(this.state.timeoutv);
        let params = { ...tableConfig, next_page_token: 0 };
        this.props.actions.getTabListReq(params);
      } else {
        this.props.dispatch({
          type: 'res_setVisible',
          payload: {
            toast: true
          }
        });
      }
    });
  }
  switchChangeRe() {
    const { id, is_starred } = this.state.showMes;
    this.switchChange(id, is_starred, true);
  }

  async switchChange(id: any, isCollection: any, needReload = false) {
    const {
      data,
      actions: {
        changeList 
      }
    } = this.props;
    const searchParams = decodeSearch();
    const params = {
      id: id,
      is_cancel: isCollection
    };
    const hide = message.loading('正在操作..', 0);
    const res = await serviceRight.setNewPWD(params);
    hide();
    if (!res.code) {
      if (needReload) {
        this.getTableList();
        message.success('恢复收藏成功');
        return;
      }
      message.success(!isCollection ? '收藏成功' : '取消收藏成功');
      const currentFileIndex = data.findIndex((value: any) => value.id === id)
      if (currentFileIndex !== -1) {
        data[currentFileIndex]['is_starred'] = !isCollection;
        changeList({ data })
      }
      let olsel = this.state.selList.find((item1: any) => item1.id == id);
      if (olsel) {
        this.setState({
          selList: [{ ...olsel, is_starred: !isCollection }]
        });
      }

      if (isCollection) {
        this.setState({
          showMes: {
            id: id,
            is_starred: !isCollection
          }
        });
        
        // 当前列表是我的收藏的时候取消收藏需要删除数据
        if (searchParams.origin === 'starred') {
          this.props.actions.delList({ ids: [id] })
        }
        setTimeout(() => {
          this.setState({
            showMes: false
          });
        }, 3000);
      }
    }
    return res;
  }
  changeState(name: any, val: any) {
    this.setState({
      [name]: val
    });
    
    if (name === 'editingRow') {
      this.isClose = false;
    }
  }

  closeModal() {
    this.props.actions.execOperation({ operation: null });
  }

  render(): JSX.Element {
    let {
      currRow,
      operation,
      createFile,
      toast,
      auth,
      isShowModal,
      tableConfig: {
        order_by, layout, folder_top, root_folderId, totalPage, pageSize, origin,
      },
      actions: {
        enterLoadingStatus,
        hiddenModal,
      }
    } = this.props;
    let pageNow = Math.max(Math.ceil(this.props.data && this.props.data.length / pageSize), 1);

    let { data: rows } = this.props;
    const grouped = order_by == 'update_time' || order_by == 'create_time';
    const listProps: any = {
      operation,
      createFile,
      layout,
      currRow,
      auth,
      order_by,
      fileNameChange: this.fileNameChange,
      editingRow: this.state.editingRow,
      saveFolderName: this.saveFolderName,
      cancelEditFolder: this.cancelEditFolder,
      getCoordinate: this.getCoordinate,
      fileClick: this.fileClick,
      drag: this.drag,
      drop: this.drop,
      dragEnd: this.dragEnd,
      draging: this.draging,
      allowDrop: this.allowDrop,
      selList: this.state.selList,
      toggleSel: this.toggleSel,
      switchChange: this.switchChange,
      dragLeave: this.dragLeave,
      handleKeyDown: this.handleKeyDown,
      isSelecting: this.state.isSelect,
      isdrop: this.state.isdrop,
      getTableList: this.getTableList,
      setOperation: this.setOperation,
      goTop: this.goTop,
      isrecent: origin == 'recent',
      tableConfig: this.props.tableConfig,
      isClose: this.isClose,
      changeState: this.changeState,
      getList: this.getList,
      enterLoadingStatus,
    };

    const { startX, startY, moveX, moveY, isSelect, showModalTip, tipResult, targetFileName, isLoading } = this.state;
    const selStyle = {
      left: Math.min(moveX, startX) - 240 + 'px',
      top:
        Math.min(moveY, startY) > 54
          ? Math.min(moveY, startY) - 54
          : Math.min(moveY, startY) + 'px',
      width: Math.abs(moveX - startX) + 'px',
      height: Math.abs(moveY - startY) + 'px',
      // width: '10' + 'px',
      // height: '20' + 'px',
      display: isSelect ? 'block' : 'none'
    };
    const dargStyle: any = {
      position: 'fixed',
      left: '-999px',
      top: 0,
      zIndex: '99999',
      pointerEvents: 'none'
    };
    const moveProps = {
      origin: 'drive',
      tableConfig: this.props.tableConfig,
      currRowId: currRow && currRow.id,
      close: this.closeModal,
      root_folderId,
      parent_id: currRow && currRow.parent_id,
      successCb: this.getTableList
    };
    const barProps: any = { 
      ...this.props, 
      isrecent: origin === 'recent',
      enterLoadingStatus,
      layout,
    };
    const scrollList: any = {
      fetchData: this.loadingMoreData,
      pageNow,
      totalPage,
      showHasmore: this.props.data.length < 20 ? false : true
    };
    const rightList: any = {
      origin: origin,
      data: currRow,
      setVisible: this.setVisibleHandle,
      switchChange: this.switchChange,
      actions: this.props.actions,
      getTableList: this.getTableList,
      changeState: this.changeState,
      tableConfig: this.props.tableConfig,
      auth: this.props.auth,
      fileClick: this.fileClick
    };
    const listPropsModal = {
      moveGoon: true,
      is_collaborated: false,
      handleCancel: this.handleCancel,
      handleok: this.handleok,
      tit: '确定移动？',
      contxt: tipResult === 'MFT_AFTER_MOVE_NOCHANGE_OR_ADD' ? `移动此内容将与有权可查看 “ ${targetFileName} ” 的所有用户共享内容` :
              tipResult === 'MFT_AFTER_MOVE_LESS' ? '移动此内容将导致某些协作用户失去使用权限': 
              tipResult === 'MFT_AFTER_MOVE_RETAIN' ? `移动此内容将与有权可查看 “ ${targetFileName} ” 的所有用户共享内容，同时将导致某些协作用户失去使用权限` : ''
    }
    return (
      <div
        className={style.right}
        id="right"
        onMouseDown={this.onMouseDown.bind(this)}
        onMouseMove={this.onMouseMove.bind(this)}
        onWheel={(e: any) => (isSelect ? e.preventDefault() : '')}
        onKeyDown={(e: any) => {
          if (e.key == 'ArrowDown' || e.key == 'ArrowUp') {
            e.preventDefault();
          }
        }}
        //hide RightMenu as Scroll
        onScroll={() => {
          const { visible } = this.state;
          if (visible) {
            this.setState({visible: false})
          } else {
            return;
          }  
        }}
      >
        <OperateBar {...barProps} />
        {
          isLoading
            ? <div className={style.filelistLoding}><Loading /></div>
            : <LazyScroll {...scrollList}>
                <div className={style.table} id="body">
                  {/* 这一部分渲染主要的文件列表 */}
                  {!folder_top
                    ? this.renderList(grouped, rows, listProps)
                    : this.fileTypeGroup(grouped, rows, listProps)}
                  <div id="rightMenu">{this.state.visible && <RightMenu {...rightList} />}</div>
                  {(operation == 'Share' || operation == 'Cooperate') && (
                    <CooperateShare
                      hiddenModal={hiddenModal}
                      getTableList={this.getTableList}
                      changeState={this.changeState}
                      isShowModal={isShowModal}
                      tab={operation}
                      origin={origin}
                      close={this.closeModal}
                      currRow={currRow}
                    />
                  )}
                  {operation == 'Move' && <MoveToModal {...moveProps} />}
                  {/* <div ref={this.selectedAreaRef} className={style.selDiv} style={selStyle} /> */}
                  <div id="DargIcon" ref="DargIcon" style={dargStyle}>
                    <DargIcon selList={this.state.selList} fileIconMap={fileIconMap} iconMap={iconMap} />
                  </div>
                  <div id="void" style={{ opacity: 0 }}>
                    &nbsp;
                  </div>
                  {toast ? (
                    <MessageInfo
                      recieveHandle={this.recoverFileFromTrashHandle}
                      title="文件已删除，您可以在回收站中恢复"
                      btntxt="撤销"
                    />
                  ) : null}
                  { showModalTip ?  <ModalCon {...listPropsModal} /> : ''}
                </div>
              </LazyScroll>
          }
      </div>
    );
  }
}
