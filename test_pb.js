// source: test.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.itbilu.AddressBook', null, global);
goog.exportSymbol('proto.itbilu.Person', null, global);
goog.exportSymbol('proto.itbilu.Person.PhoneNumber', null, global);
goog.exportSymbol('proto.itbilu.Person.PhoneType', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.itbilu.Person = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.itbilu.Person.repeatedFields_, null);
};
goog.inherits(proto.itbilu.Person, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.itbilu.Person.displayName = 'proto.itbilu.Person';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.itbilu.Person.PhoneNumber = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.itbilu.Person.PhoneNumber, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.itbilu.Person.PhoneNumber.displayName = 'proto.itbilu.Person.PhoneNumber';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.itbilu.AddressBook = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.itbilu.AddressBook.repeatedFields_, null);
};
goog.inherits(proto.itbilu.AddressBook, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.itbilu.AddressBook.displayName = 'proto.itbilu.AddressBook';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.itbilu.Person.repeatedFields_ = [4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.itbilu.Person.prototype.toObject = function(opt_includeInstance) {
  return proto.itbilu.Person.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.itbilu.Person} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.itbilu.Person.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: (f = jspb.Message.getField(msg, 1)) == null ? undefined : f,
    id: (f = jspb.Message.getField(msg, 2)) == null ? undefined : f,
    email: (f = jspb.Message.getField(msg, 3)) == null ? undefined : f,
    phoneList: jspb.Message.toObjectList(msg.getPhoneList(),
    proto.itbilu.Person.PhoneNumber.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.itbilu.Person}
 */
proto.itbilu.Person.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.itbilu.Person;
  return proto.itbilu.Person.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.itbilu.Person} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.itbilu.Person}
 */
proto.itbilu.Person.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setEmail(value);
      break;
    case 4:
      var value = new proto.itbilu.Person.PhoneNumber;
      reader.readMessage(value,proto.itbilu.Person.PhoneNumber.deserializeBinaryFromReader);
      msg.addPhone(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.itbilu.Person.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.itbilu.Person.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.itbilu.Person} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.itbilu.Person.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getPhoneList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.itbilu.Person.PhoneNumber.serializeBinaryToWriter
    );
  }
};


/**
 * @enum {number}
 */
proto.itbilu.Person.PhoneType = {
  MOBILE: 0,
  HOME: 1,
  WORK: 2
};




if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.itbilu.Person.PhoneNumber.prototype.toObject = function(opt_includeInstance) {
  return proto.itbilu.Person.PhoneNumber.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.itbilu.Person.PhoneNumber} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.itbilu.Person.PhoneNumber.toObject = function(includeInstance, msg) {
  var f, obj = {
    number: (f = jspb.Message.getField(msg, 1)) == null ? undefined : f,
    type: jspb.Message.getFieldWithDefault(msg, 2, 1)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.itbilu.Person.PhoneNumber}
 */
proto.itbilu.Person.PhoneNumber.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.itbilu.Person.PhoneNumber;
  return proto.itbilu.Person.PhoneNumber.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.itbilu.Person.PhoneNumber} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.itbilu.Person.PhoneNumber}
 */
proto.itbilu.Person.PhoneNumber.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setNumber(value);
      break;
    case 2:
      var value = /** @type {!proto.itbilu.Person.PhoneType} */ (reader.readEnum());
      msg.setType(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.itbilu.Person.PhoneNumber.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.itbilu.Person.PhoneNumber.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.itbilu.Person.PhoneNumber} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.itbilu.Person.PhoneNumber.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {!proto.itbilu.Person.PhoneType} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeEnum(
      2,
      f
    );
  }
};


/**
 * required string number = 1;
 * @return {string}
 */
proto.itbilu.Person.PhoneNumber.prototype.getNumber = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.itbilu.Person.PhoneNumber} returns this
 */
proto.itbilu.Person.PhoneNumber.prototype.setNumber = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.itbilu.Person.PhoneNumber} returns this
 */
proto.itbilu.Person.PhoneNumber.prototype.clearNumber = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.itbilu.Person.PhoneNumber.prototype.hasNumber = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional PhoneType type = 2;
 * @return {!proto.itbilu.Person.PhoneType}
 */
proto.itbilu.Person.PhoneNumber.prototype.getType = function() {
  return /** @type {!proto.itbilu.Person.PhoneType} */ (jspb.Message.getFieldWithDefault(this, 2, 1));
};


/**
 * @param {!proto.itbilu.Person.PhoneType} value
 * @return {!proto.itbilu.Person.PhoneNumber} returns this
 */
proto.itbilu.Person.PhoneNumber.prototype.setType = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.itbilu.Person.PhoneNumber} returns this
 */
proto.itbilu.Person.PhoneNumber.prototype.clearType = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.itbilu.Person.PhoneNumber.prototype.hasType = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * required string name = 1;
 * @return {string}
 */
proto.itbilu.Person.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.itbilu.Person} returns this
 */
proto.itbilu.Person.prototype.setName = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.itbilu.Person} returns this
 */
proto.itbilu.Person.prototype.clearName = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.itbilu.Person.prototype.hasName = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * required int32 id = 2;
 * @return {number}
 */
proto.itbilu.Person.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.itbilu.Person} returns this
 */
proto.itbilu.Person.prototype.setId = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.itbilu.Person} returns this
 */
proto.itbilu.Person.prototype.clearId = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.itbilu.Person.prototype.hasId = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional string email = 3;
 * @return {string}
 */
proto.itbilu.Person.prototype.getEmail = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.itbilu.Person} returns this
 */
proto.itbilu.Person.prototype.setEmail = function(value) {
  return jspb.Message.setField(this, 3, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.itbilu.Person} returns this
 */
proto.itbilu.Person.prototype.clearEmail = function() {
  return jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.itbilu.Person.prototype.hasEmail = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * repeated PhoneNumber phone = 4;
 * @return {!Array<!proto.itbilu.Person.PhoneNumber>}
 */
proto.itbilu.Person.prototype.getPhoneList = function() {
  return /** @type{!Array<!proto.itbilu.Person.PhoneNumber>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.itbilu.Person.PhoneNumber, 4));
};


/**
 * @param {!Array<!proto.itbilu.Person.PhoneNumber>} value
 * @return {!proto.itbilu.Person} returns this
*/
proto.itbilu.Person.prototype.setPhoneList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.itbilu.Person.PhoneNumber=} opt_value
 * @param {number=} opt_index
 * @return {!proto.itbilu.Person.PhoneNumber}
 */
proto.itbilu.Person.prototype.addPhone = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.itbilu.Person.PhoneNumber, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.itbilu.Person} returns this
 */
proto.itbilu.Person.prototype.clearPhoneList = function() {
  return this.setPhoneList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.itbilu.AddressBook.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.itbilu.AddressBook.prototype.toObject = function(opt_includeInstance) {
  return proto.itbilu.AddressBook.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.itbilu.AddressBook} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.itbilu.AddressBook.toObject = function(includeInstance, msg) {
  var f, obj = {
    personList: jspb.Message.toObjectList(msg.getPersonList(),
    proto.itbilu.Person.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.itbilu.AddressBook}
 */
proto.itbilu.AddressBook.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.itbilu.AddressBook;
  return proto.itbilu.AddressBook.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.itbilu.AddressBook} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.itbilu.AddressBook}
 */
proto.itbilu.AddressBook.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.itbilu.Person;
      reader.readMessage(value,proto.itbilu.Person.deserializeBinaryFromReader);
      msg.addPerson(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.itbilu.AddressBook.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.itbilu.AddressBook.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.itbilu.AddressBook} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.itbilu.AddressBook.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPersonList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.itbilu.Person.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Person person = 1;
 * @return {!Array<!proto.itbilu.Person>}
 */
proto.itbilu.AddressBook.prototype.getPersonList = function() {
  return /** @type{!Array<!proto.itbilu.Person>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.itbilu.Person, 1));
};


/**
 * @param {!Array<!proto.itbilu.Person>} value
 * @return {!proto.itbilu.AddressBook} returns this
*/
proto.itbilu.AddressBook.prototype.setPersonList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.itbilu.Person=} opt_value
 * @param {number=} opt_index
 * @return {!proto.itbilu.Person}
 */
proto.itbilu.AddressBook.prototype.addPerson = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.itbilu.Person, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.itbilu.AddressBook} returns this
 */
proto.itbilu.AddressBook.prototype.clearPersonList = function() {
  return this.setPersonList([]);
};


goog.object.extend(exports, proto.itbilu);
