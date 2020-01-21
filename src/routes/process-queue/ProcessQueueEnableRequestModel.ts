export class ProcessQueueEnableRequestModel {
    public enable!: boolean;

    public getValue() {
        return {
            enable: this.enable,
        };
    }

}
