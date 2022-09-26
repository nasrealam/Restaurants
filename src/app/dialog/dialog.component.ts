import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../Service/user.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {


  userForm!: FormGroup;

  constructor(private builder: FormBuilder,
    private user: UserService) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      'restaurants_ID': new FormControl(null, Validators.required),
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'service': new FormControl(null, Validators.required),
      'checkbox': new FormControl(null, Validators.required),
    })
  }

  // for Save the User Data in Api-Server

  postProduct() {
    if (this.userForm.valid) {
      this.user.toPostDetails(this.userForm.value).subscribe({
        next: (res) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Product has been Added Successfully!!',
            showConfirmButton: false,
            timer: 1500
          })
          location.reload();
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'opps.....',
            text: 'Something went Wrong!'
          })
        }
      })
    }
  }


}
