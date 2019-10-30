"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var _BaseController_1 = require("./_BaseController");
var SearchIndexingController = /** @class */ (function (_super) {
    __extends(SearchIndexingController, _super);
    function SearchIndexingController() {
        return _super.call(this, 'search-indexing') || this;
    }
    SearchIndexingController.prototype.indexPending = function () {
        console.log('indexing');
    };
    return SearchIndexingController;
}(_BaseController_1["default"]));
exports.SearchIndexingController = SearchIndexingController;
