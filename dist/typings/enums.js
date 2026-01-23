"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestStatus = exports.DeviceState = void 0;
var DeviceState;
(function (DeviceState) {
    DeviceState["IDLE"] = "IDLE";
    DeviceState["LOADING"] = "LOADING";
    DeviceState["LOADED"] = "LOADED";
    DeviceState["DELIVERING"] = "DELIVERING";
    DeviceState["DELIVERED"] = "DELIVERED";
    DeviceState["RETURNING"] = "RETURNING";
})(DeviceState || (exports.DeviceState = DeviceState = {}));
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["PENDING"] = "Pending";
    RequestStatus["ACCEPTED"] = "Accepted";
    RequestStatus["REJECTED"] = "Rejected";
    RequestStatus["CANCELED"] = "Canceled";
    RequestStatus["IN_TRANSIT"] = "In Transit";
    RequestStatus["DELIVERED"] = "Delivered";
})(RequestStatus || (exports.RequestStatus = RequestStatus = {}));
//# sourceMappingURL=enums.js.map