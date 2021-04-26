import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Version } from '../_models/version';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import ClassicEditor from '@haifahrul/ckeditor5-build-rich';

@Component({
  selector: 'app-versions-list-header',
  templateUrl: './versions-list-header.component.html',
  styleUrls: ['./versions-list-header.component.scss']
})
export class VersionsListHeaderComponent implements OnInit {

  newVersion: Version = new Version();
  dueDate: Date = new Date();
  editor = ClassicEditor;
  data: any = `<p>Hello, world!</p>`;
  registerForm: FormGroup;
  submitted = false;
  
  config = {
    toolbar: [
      'undo',
      'redo',
      '|',
      'heading',
      'fontFamily',
      'fontSize',
      '|',
      'bold',
      'italic',
      'underline',
      'fontColor',
      'fontBackgroundColor',
      'highlight',
      '|',
      'link',
      'CKFinder',
      'imageUpload',
      'mediaEmbed',
      '|',
      'alignment',
      'bulletedList',
      'numberedList',
      '|',
      'indent',
      'outdent',
      '|',
      'insertTable',
      'blockQuote',
      'specialCharacters'
    ],
    language: 'en',
  }
  @Output()
  add: EventEmitter<Version> = new EventEmitter();

  get f() { return this.registerForm.controls; }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm);
    this.newVersion.title = this.registerForm.controls.title.value;
    this.newVersion.description = this.registerForm.controls.description.value;
    this.add.emit(this.newVersion);
    this.newVersion = new Version();
    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

}
