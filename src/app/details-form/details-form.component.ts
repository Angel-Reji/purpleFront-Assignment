import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DetailsService } from '../services/details.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.css']
})
export class DetailsFormComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private detailsService: DetailsService,
    private modalService: NgbModal
  ) { }
  closeResult: string;  
  isShow = true;
  fetchData: any[];
  detailsFormGroup: FormGroup;
  attributes: FormArray;
  attributeTable:false;
  // Doc Types
  documentType: any = [ 'invoice', 'quote', 'RFP', 'proposal', 'contract', 'packing slip', 'manifest', 'report',' spread sheet'];
  //File Types
  fileType: any = [ 'TIFF', 'PSD', 'GIF', 'JPEG', 'PNG', 'PDF', 'EPS', 'AI'];
  ngOnInit() {
    this.createForm();
    this.getDetailById();
    this.getDetails();  
  }
  createForm() {
    this.detailsFormGroup = this.fb.group({
      documentTypeId: [''],
      fileType: [''],
      received: [''],
      pageCount: [''],
      fileSize: [''],
      attributes: this.fb.array([this.initAttribute()])
    });
  }
  private initAttribute() {
    return this.fb.group({
      attributeId: [''],
      value: ['']
    })
  }
 
  doSave() {
    let detail = this.detailsFormGroup.value;
    const dataKey = '5c796a4bb95fde2f3c90a121'
    this.detailsService.updateDetails(detail, dataKey).subscribe(
      () => {
        alert("Saved")
      });
  }

  addItem() {
    this.attributes = this.detailsFormGroup.get('attributes') as FormArray;
    this.attributes.push(this.initAttribute());
  }
  deleteItem(i: number) {
    this.attributes = this.detailsFormGroup.get('attributes') as FormArray;
    this.attributes.removeAt(i);
  }

  getDetails() {
    this.detailsService
      .getDetails()
      .subscribe(data => {
      this.fetchData = data[0].attributes;
      });
  }

  getDetailById() {
    const dataKey = '5c796a4bb95fde2f3c90a121'
    this.detailsService.getAllDetailById(dataKey).subscribe(
      attribute => {
        this.detailsFormGroup.patchValue({
          documentTypeId: attribute.documentTypeId,
          fileType: attribute.fileType,
          received: attribute.received,
          pageCount: attribute.pageCount,
          fileSize: attribute.fileSize,
          attributes: attribute.attributes
        });
        const control = <FormArray>this.detailsFormGroup.controls['attributes'];
        for (let i = 1; i < attribute.attributes.length; i++) {
          control.push(this.initAttribute());
        }
        this.detailsFormGroup.patchValue({ attributes: attribute.attributes });
      });

  }
  open(content) {
    this.modalService.open(content);
  }
  cancel(){
    this.ngOnInit();
  }
}
