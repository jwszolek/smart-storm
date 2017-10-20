import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from '../helpers/data.service';
import { AdvGrowlService } from 'primeng-advanced-growl';

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
	};

	selectedSensor:any;

	newSensor: boolean;

	constructor(private service:DataService,
       private growlService: AdvGrowlService) {

	}

	ngAfterViewInit(): void {
       this.loadData();
	}

 	showDialogToAdd() {
        this.newSensor = true;
        this.sensor = {
			name:'',
			date:new Date(),
		};
        this.displayDialog = true;
    }
    
    save() {
        if(this.newSensor){
            this.service.submitSensor(this.sensor).subscribe((status:any)=>{
                // console.log(status);

                this.growlService.createSuccessMessage(status.user,'Submit successful');

                // this.growlService.createErrorMessage('',status.user);
                this.loadData();
            });
        }
        else{
            this.service.updateSensor(this.sensor).subscribe((status:any)=>{
                // console.log(status);                  
                this.growlService.createSuccessMessage(status.user,'Update successful');

                // this.growlService.createErrorMessage('',status.user);
                this.loadData();
            });;
            // sensors[this.findSelectedSensorIndex()] = this.sensor;
        }
        
        this.sensor = null;
        this.displayDialog = false;
    }
    
    delete() {
        // let index = this.findSelectedSensorIndex();
        // this.sensors = this.sensors.filter((val,i) => i!=index);
        if(!this.newSensor)
            this.service.deleteSensor(this.sensor).subscribe((status:any)=>{
                // console.log(status);

                this.growlService.createSuccessMessage(status.user,'Delete successful');

                // this.growlService.createErrorMessage('',status.user);
                this.loadData();
            });

        this.sensor = null;
        this.displayDialog = false;
    }    

    loadData(){
        this.service.getSensors().subscribe((data:any)=>{
            this.sensors=data;
            this.growlService.createInfoMessage('Loaded '+data.length+' sensor(s)','Loading successful');
            // console.log(data);
        });
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
    
    // findSelectedSensorIndex(): number {
    //     return this.sensors.indexOf(this.selectedSensor);
    // }

}
