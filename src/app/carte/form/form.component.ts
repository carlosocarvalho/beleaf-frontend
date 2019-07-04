import { ErrorDialogService } from './../../shared/error-dialog.service';
import { CarteService } from './../services/carte.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { requiredFileType, sizeFileValidator } from 'src/app/helpers/validation-file-custom';
import { uploadProgress } from 'src/app/helpers/operators';
import { toResponseBody } from 'src/app/helpers';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public productFormGroup: FormGroup

  submitted = false
  fileSizeUpload = '1mb'

  inLoading = false

  constructor(
    private readonly builder: FormBuilder,
    private readonly provider: CarteService,
    private readonly dialogHandler: ErrorDialogService) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    this.productFormGroup = this.builder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      stock: [1, Validators.required],
      discount: [0, Validators.required],
      price: ['0.00', Validators.required],
      image: new FormControl(null, [Validators.required,
      sizeFileValidator(this.fileSizeUpload),
      requiredFileType(['png', 'jpg', 'jpeg'])]),
      stuff: [null, Validators.required]
    })
  }

  get in() { return this.productFormGroup.controls }

  get fileOnError() {
    return this.in.image.errors && this.submitted === true
  }
  save() {
    this.submitted = true
    if (this.productFormGroup.invalid) return;
    this.inLoading = true
    this.productFormGroup.disable()
    this.provider.create(this.productFormGroup.value)
      .pipe(
        uploadProgress(progress => console.log(progress)),
        toResponseBody(),
        finalize(() => {
          this.inLoading = false
          this.submitted = false
          this.productFormGroup.enable()
        })
      )
      .subscribe(response => {

        this.dialogHandler.openDialog({
          message: 'Operação concluida com sucesso',
          status: 201
        }).afterClosed().subscribe(() => {
          this.productFormGroup.reset({
            stock: 1,
            discount: 0
          })
        })

      })
  }

}
