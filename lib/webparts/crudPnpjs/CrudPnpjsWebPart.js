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
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import styles from './CrudPnpjsWebPart.module.scss';
import * as strings from 'CrudPnpjsWebPartStrings';
import { SPComponentLoader } from '@microsoft/sp-loader';
import pnp from 'sp-pnp-js';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
require('bootstrap');
var CrudPnpjsWebPart = /** @class */ (function (_super) {
    __extends(CrudPnpjsWebPart, _super);
    function CrudPnpjsWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CrudPnpjsWebPart.prototype.AddEventListeners = function () {
        var _this = this;
        document.getElementById('AddItemToSPList').addEventListener('click', function () { return _this.AddSPListItem(); });
        document.getElementById('UpdateItemInSPList').addEventListener('click', function () { return _this.UpdateSPListItem(); });
        document.getElementById('DeleteItemFromSPList').addEventListener('click', function () { return _this.DeleteSPListItem(); });
    };
    CrudPnpjsWebPart.prototype._getAuditData = function () {
        return pnp.sp.web.lists.getByTitle("Audit Tool Data").items.get().then(function (response) {
            return response;
        });
    };
    CrudPnpjsWebPart.prototype.getAuditData = function () {
        var _this = this;
        this._getAuditData()
            .then(function (response) {
            _this._renderAuditData(response);
        });
    };
    CrudPnpjsWebPart.prototype._renderAuditData = function (items) {
        var html = '<table class="TFtable" border=1 width=style="bordercollapse: collapse;">';
        html += "<th></th><th>ID</th><th>Assessment</th><th>Medical</th>";
        if (items.length > 0) {
            items.forEach(function (item) {
                html += "    \n          <tr>   \n          <td><input type=\"radio\" id=\"AuditID\" name=\"AuditID\" value=\"" + item.ID + "\"><br></td>   \n          <td>" + item.ID + "</td>    \n          <td>" + item.Assessment + "</td>    \n          <td>" + item.Medicals + "</td>    \n          </tr>";
            });
        }
        else {
            html += "No records...";
        }
        html += "</table>";
        var listContainer = this.domElement.querySelector('#AuditDataItems');
        listContainer.innerHTML = html;
    };
    CrudPnpjsWebPart.prototype._getAuditQuestions = function () {
        return pnp.sp.web.lists.getByTitle("Audit Tool Questions").items.get().then(function (response) {
            return response;
        });
    };
    CrudPnpjsWebPart.prototype.getAuditQuestions = function () {
        var _this = this;
        this._getAuditQuestions()
            .then(function (response) {
            _this._renderQuestions(response);
        });
    };
    CrudPnpjsWebPart.prototype._renderQuestions = function (items) {
        var html = "";
        if (items.length > 0) {
            items.forEach(function (item) {
                html += "    \n        <div class=\"row\">\n            <div class=\"col-1\">" + item.Question_Number + "</div>\n            <div class=\"col-6\">" + item.Question_Text + "</div>\n            <div class=\"col-3 text-center\">\n                <div class=\"form-check-inline\">\n                    <label class=\"form-check-label\">\n                    Yes <input type=\"radio\" class=\"form-check-input\" name=\"CCRQ1yes\">\n                    </label>\n                </div>\n                <div class=\"form-check-inline\">\n                    <label class=\"form-check-label\">\n                    No <input type=\"radio\" class=\"form-check-input\" name=\"CCRQ1no\">\n                    </label>\n                </div>\n                <div class=\"form-check-inline\">\n                    <label class=\"form-check-label\">\n                    N/A <input type=\"radio\" class=\"form-check-input\" name=\"CCRQ1na\">\n                    </label>\n                </div> \n            </div>\n            <div class=\"col bg-success text-white border border-success text-center\">100%</div>\n            <div class=\"col text-right\">" + item.Min_Outcome + "</div>\n        </div>\n        <hr>\n        ";
            });
        }
        else {
            html += "No records...";
        }
        html += "</table>";
        var listContainer = this.domElement.querySelector('#AuditQuestionItems');
        listContainer.innerHTML = html;
    };
    CrudPnpjsWebPart.prototype.render = function () {
        var bootstrapCssURL = "https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
        var fontawesomeCssURL = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/regular.min.css";
        SPComponentLoader.loadCss(bootstrapCssURL);
        SPComponentLoader.loadCss(fontawesomeCssURL);
        this.domElement.innerHTML = "    \n      <div class=\"parentContainer\" style=\"background-color: white\">    \n      <div class=\"ms-Grid-row ms-bgColor-themeDark ms-fontColor-white " + styles.row + "\">    \n         <div class=\"ms-Grid-col ms-u-lg ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1\">   \n         </div>    \n      </div>    \n      <div class=\"ms-Grid-row ms-bgColor-themeDark ms-fontColor-white " + styles.row + "\">    \n         <div style=\"background-color:Black;color:white;text-align: center;font-weight: bold;font-size:x;\">CRUD Test</div>    \n      </div>    \n      <div style=\"background-color: white\" >    \n         <form>    \n            <br>    \n            <div data-role=\"header\">    \n               <h3>Add item to SharePoint List</h3>    \n            </div>    \n             <div data-role=\"main\" class=\"ui-content\">    \n               <div>    \n                 <input id=\"Assessment\" placeholder=\"Assessment\"/>    \n                 <input id=\"Medical\"  placeholder=\"Medical\"/>    \n                 <button id=\"AddItemToSPList\"  type=\"submit\" >Add</button>    \n                 <button id=\"UpdateItemInSPList\" type=\"submit\" >Update</button>    \n                 <button id=\"DeleteItemFromSPList\"  type=\"submit\" >Delete</button>  \n               </div>    \n             </div>    \n         </form>    \n      </div>    \n      <br/>    \n      <div style=\"background-color: white\" id=\"AuditDataItems\" />    \n      </div>\n      <div class=\"row text-white\" style=\"background-color: #545487;\">\n          <h3 class=\"ml-2\">Clinical Consultation Records</h3>\n      </div>\n      <div class=\"row\">\n          <div class=\"col-10\"></div>\n          <div class=\"col\">Average<br/>Yearly<br/>Score</div>\n          <div class=\"col\">Minimum<br/>Outcome</div>\n      </div>\n      <hr>\n      <div class=\"container\" style=\"overflow-y:scroll; overflow-x:hidden; height: 25vh !important;\" id=\"AuditQuestionItems\"></div>            \n      ";
        this.getAuditData();
        this.getAuditQuestions();
        this.AddEventListeners();
    };
    CrudPnpjsWebPart.prototype.AddSPListItem = function () {
        pnp.sp.web.lists.getByTitle('Audit Tool Data').items.add({
            Assessment: document.getElementById('Assessment')["value"],
            Medicals: document.getElementById('Medical')["value"]
        });
        alert("Record with Assessment type : " + document.getElementById('Assessment')["value"] + " Added !");
    };
    CrudPnpjsWebPart.prototype.UpdateSPListItem = function () {
        var itemID = this.domElement.querySelector('input[name = "AuditID"]:checked')["value"];
        pnp.sp.web.lists.getByTitle("Audit Tool Data").items.getById(itemID).update({
            Assessment: document.getElementById('Assessment')["value"],
            Medicals: document.getElementById('Medical')["value"]
        });
        alert("Record with Audit ID : " + itemID + " Updated !");
    };
    CrudPnpjsWebPart.prototype.DeleteSPListItem = function () {
        var itemID = this.domElement.querySelector('input[name = "AuditID"]:checked')["value"];
        pnp.sp.web.lists.getByTitle("Audit Tool Data").items.getById(itemID).delete();
        alert("Record with Audit ID : " + itemID + " Deleted !");
    };
    Object.defineProperty(CrudPnpjsWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    CrudPnpjsWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return CrudPnpjsWebPart;
}(BaseClientSideWebPart));
export default CrudPnpjsWebPart;
//# sourceMappingURL=CrudPnpjsWebPart.js.map