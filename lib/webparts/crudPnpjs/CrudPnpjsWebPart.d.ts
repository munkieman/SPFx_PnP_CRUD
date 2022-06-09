import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
export interface ICrudPnpjsWebPartProps {
    description: string;
}
export interface AuditDataList {
    ID: string;
    Medicals: string;
    Assessment: string;
    Audit_Year: Date;
    ohaName: string;
    ctlName: string;
    Month: string;
    Case_Number: string;
    Audit_Date: Date;
}
export interface AuditQuestionList {
    ID: string;
    Section: string;
    Assessment: string;
    Question_Number: Number;
    Question_Text: string;
    Min_Outcome: Number;
}
export default class CrudPnpjsWebPart extends BaseClientSideWebPart<ICrudPnpjsWebPartProps> {
    private AddEventListeners;
    private _getAuditData;
    private getAuditData;
    private _renderAuditData;
    private _getAuditQuestions;
    private getAuditQuestions;
    private _renderQuestions;
    render(): void;
    AddSPListItem(): void;
    UpdateSPListItem(): void;
    DeleteSPListItem(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=CrudPnpjsWebPart.d.ts.map