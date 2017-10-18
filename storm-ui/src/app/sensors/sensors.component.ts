import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'sensors-component',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})

export class SensorsComponent implements AfterViewInit {
	sensors=[];
	displayDialog: boolean;

	sensor:any = {
		name:'',
		date:new Date(),
		id:''
	};

	selectedSensor:any;

	newSensor: boolean;

	constructor() {

	}

	ngAfterViewInit(): void {

	}

 	showDialogToAdd() {
        this.newSensor = true;
        this.sensor = {
			name:'',
			date:new Date(),
			id:''
		};
        this.displayDialog = true;
    }
    
    save() {
        let sensors = [...this.sensors];
        if(this.newSensor)
            sensors.push(this.sensor);
        else
            sensors[this.findSelectedSensorIndex()] = this.sensor;
        
        this.sensors = sensors;
        this.sensor = null;
        this.displayDialog = false;
    }
    
    delete() {
        let index = this.findSelectedSensorIndex();
        this.sensors = this.sensors.filter((val,i) => i!=index);
        this.sensor = null;
        this.displayDialog = false;
    }    
    
    onRowSelect(event) {
        this.newSensor = false;
        this.sensor = this.cloneSensor(event.data);
        this.displayDialog = true;
    }
    
    cloneSensor(c: any): any {
        let sensor = Object.assign({},c);
        return sensor;
    }
    
    findSelectedSensorIndex(): number {
        return this.sensors.indexOf(this.selectedSensor);
    }

}
