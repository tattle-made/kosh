export class MetadataIndexCreateRequest {
    public metadata_type!: number;
    public metadata_id!: number;
    public post_id!: number;

    constructor(param: any) {
        this.metadata_type = param.metadata_type;
        this.metadata_id = param.metadata_id;
        this.post_id = param.post_id;
    }

    public getAll() {
        return {
            metadata_type: this.metadata_type,
            metadata_id: this.metadata_id,
            post_id: this.post_id
        };
    }
}

export class MetadataTextCreateRequest {
    public post_id!: number;
    public value!: string;
    public created_by!: number;
    public created_at!: string;
    
    constructor(param: any) {
        this.post_id = param.post_id;
        this.value = param.value;
        this.created_by = param.created_by;
        this.created_at = param.created_at;
    }

    public getAll() {
        return {
            post_id: this.post_id,
            value: this.value,
            created_by: this.created_by,
            created_at: this.created_at
        };
    }
}

export class MetadataNumberCreateRequest {
    public post_id!: number;
    public value!: string;
    public created_by!: number;
    public created_at!: string;
    
    constructor(param: any) {
        this.post_id = param.post_id;
        this.value = param.value;
        this.created_by = param.created_by;
        this.created_at = param.created_at;
    }

    public getAll() {
        return {
            post_id: this.post_id,
            value: this.value,
            created_by: this.created_by,
            created_at: this.created_at
        };
    }
}

export class MetadataLatLongCreateRequest {
    public post_id!: number;
    public latitude!: number;
    public longitude!: number;
    public created_by!: number;
    public created_at!: string;
    
    constructor(param: any) {
        this.post_id = param.post_id;
        this.latitude = param.latitude;
        this.longitude = param.longitude;
        this.created_by = param.created_by;
        this.created_at = param.created_at;
    }

    public getAll() {
        return {
            post_id: this.post_id,
            latitude: this.latitude,
            longitude: this.longitude,
            created_by: this.created_by,
            created_at: this.created_at
        };
    }
}

export class MetadataDateRangeCreateRequest {
    public post_id!: number;
    public start_date!: string;
    public end_date!: string;
    public created_by!: number;
    public created_at!: string;
    
    constructor(param: any) {
        this.post_id = param.post_id;
        this.start_date = param.start_date;
        this.end_date = param.end_date;
        this.created_by = param.created_by;
        this.created_at = param.created_at;
    }

    public getAll() {
        return {
            post_id: this.post_id,
            start_date: this.start_date,
            end_date: this.end_date,
            created_by: this.created_by,
            created_at: this.created_at
        };
    }
}

export class MetadataDateCreateRequest {
    public post_id!: number;
    public date!: string;
    public created_by!: number;
    public created_at!: string;
    
    constructor(param: any) {
        this.post_id = param.post_id;
        this.date = param.date;
        this.created_by = param.created_by;
        this.created_at = param.created_at;
    }

    public getAll() {
        return {
            post_id: this.post_id,
            date: this.date,
            created_by: this.created_by,
            created_at: this.created_at
        };
    }
}


export class MetadataTextUpdateRequest {
    public id!: number;
    public value!: string;
    public created_by!: number;
    public created_at!: string;
    
    constructor(param: any) {
        this.id = param.id;
        this.value = param.value;
        this.created_by = param.created_by;
        this.created_at = param.created_at;
    }

    public getAll() {
        return {
            id: this.id,
            value: this.value,
            created_by: this.created_by,
            created_at: this.created_at
        };
    }
}

export class MetadataNumberUpdateRequest {
    public id!: number;
    public value!: string;
    public created_by!: number;
    public created_at!: string;
    
    constructor(param: any) {
        this.id = param.id;
        this.value = param.value;
        this.created_by = param.created_by;
        this.created_at = param.created_at;
    }

    public getAll() {
        return {
            id: this.id,
            value: this.value,
            created_by: this.created_by,
            created_at: this.created_at
        };
    }
}

export class MetadataLatLongUpdateRequest {
    public id!: number;
    public latitude!: number;
    public longitude!: number;
    public created_by!: number;
    public created_at!: string;
    
    constructor(param: any) {
        this.id = param.id;
        this.latitude = param.latitude;
        this.longitude = param.longitude;
        this.created_by = param.created_by;
        this.created_at = param.created_at;
    }

    public getAll() {
        return {
            id: this.id,
            latitude: this.latitude,
            longitude: this.longitude,
            created_by: this.created_by,
            created_at: this.created_at
        };
    }
}

export class MetadataDateRangeUpdateRequest {
    public id!: number;
    public start_date!: string;
    public end_date!: string;
    public created_by!: number;
    public created_at!: string;
    
    constructor(param: any) {
        this.id = param.id;
        this.start_date = param.start_date;
        this.end_date = param.end_date;
        this.created_by = param.created_by;
        this.created_at = param.created_at;
    }

    public getAll() {
        return {
            id: this.id,
            start_date: this.start_date,
            end_date: this.end_date,
            created_by: this.created_by,
            created_at: this.created_at
        };
    }
}

export class MetadataDateUpdateRequest {
    public id!: number;
    public date!: string;
    public created_by!: number;
    public created_at!: string;
    
    constructor(param: any) {
        this.id = param.id;
        this.date = param.date;
        this.created_by = param.created_by;
        this.created_at = param.created_at;
    }

    public getAll() {
        return {
            id: this.id,
            date: this.date,
            created_by: this.created_by,
            created_at: this.created_at
        };
    }
}
