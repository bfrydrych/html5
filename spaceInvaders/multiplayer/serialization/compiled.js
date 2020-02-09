/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

// var $protobuf = require("protobufjs/minimal");
var $protobuf = protobuf;
// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.NewShip = (function() {

    /**
     * Properties of a NewShip.
     * @exports INewShip
     * @interface INewShip
     * @property {string} [canvas] NewShip canvas
     */

    /**
     * Constructs a new NewShip.
     * @exports NewShip
     * @classdesc Represents a NewShip.
     * @constructor
     * @param {INewShip=} [properties] Properties to set
     */
    function NewShip(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * NewShip canvas.
     * @member {string}canvas
     * @memberof NewShip
     * @instance
     */
    NewShip.prototype.canvas = "";

    /**
     * Creates a new NewShip instance using the specified properties.
     * @function create
     * @memberof NewShip
     * @static
     * @param {INewShip=} [properties] Properties to set
     * @returns {NewShip} NewShip instance
     */
    NewShip.create = function create(properties) {
        return new NewShip(properties);
    };

    /**
     * Encodes the specified NewShip message. Does not implicitly {@link NewShip.verify|verify} messages.
     * @function encode
     * @memberof NewShip
     * @static
     * @param {INewShip} message NewShip message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    NewShip.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.canvas != null && message.hasOwnProperty("canvas"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.canvas);
        return writer;
    };

    /**
     * Encodes the specified NewShip message, length delimited. Does not implicitly {@link NewShip.verify|verify} messages.
     * @function encodeDelimited
     * @memberof NewShip
     * @static
     * @param {INewShip} message NewShip message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    NewShip.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a NewShip message from the specified reader or buffer.
     * @function decode
     * @memberof NewShip
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {NewShip} NewShip
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    NewShip.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NewShip();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.canvas = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a NewShip message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof NewShip
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {NewShip} NewShip
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    NewShip.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a NewShip message.
     * @function verify
     * @memberof NewShip
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    NewShip.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.canvas != null && message.hasOwnProperty("canvas"))
            if (!$util.isString(message.canvas))
                return "canvas: string expected";
        return null;
    };

    /**
     * Creates a NewShip message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof NewShip
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {NewShip} NewShip
     */
    NewShip.fromObject = function fromObject(object) {
        if (object instanceof $root.NewShip)
            return object;
        var message = new $root.NewShip();
        if (object.canvas != null)
            message.canvas = String(object.canvas);
        return message;
    };

    /**
     * Creates a plain object from a NewShip message. Also converts values to other types if specified.
     * @function toObject
     * @memberof NewShip
     * @static
     * @param {NewShip} message NewShip
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    NewShip.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.canvas = "";
        if (message.canvas != null && message.hasOwnProperty("canvas"))
            object.canvas = message.canvas;
        return object;
    };

    /**
     * Converts this NewShip to JSON.
     * @function toJSON
     * @memberof NewShip
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    NewShip.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return NewShip;
})();

// module.exports = $root;
