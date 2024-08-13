import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, switchMap, tap } from 'rxjs';
import { io } from 'socket.io-client';
import { HttpService } from 'src/app/services/http/http.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  selected?: string;
  modalRef?: BsModalRef;
  searchedUser!: any;
  searchedUser1!: any;
  userStatus = false;
  userStatus1 = false;
  groupUserList: any = [];
  userGroupId: any = [];
  groupUsers: any = [];
  searchControl = new FormControl();
  addUserControl = new FormControl();
  chat: any = {};
  chats: any = [];
  groupAdmin: any;
  chatDetails: any;
  groupSubmitFlag = false;
  messageText = new FormControl();
  friend: any;
  loginuser: any;
  selectedUser: any = [];
  createGroup = new FormGroup({
    chatName: new FormControl('', Validators.required),
  });

  constructor(
    private http: HttpService,
    private sockethttp: WebsocketService,
    private modalService: BsModalService,
    private tostr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginuser = this.loginUser();
    this.fetchChats();
    this.searchUserByKey();
    this.searchUserByKey1();
  }

  fetchChats() {
    this.http.get(`chat`).subscribe({
      next: (data) => {
        console.log(data);
        this.chats = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  searchUserByKey() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        tap((data) => (this.userStatus = data.length > 0)),
        switchMap((term) => this.http.get(`user?search=${term}`))
      )
      .subscribe((data) => {
        this.searchedUser = data;
        console.log(data);
      });
  }

  searchUserByKey1() {
    this.addUserControl.valueChanges
      .pipe(
        debounceTime(100),
        tap((data) => (this.userStatus1 = data?.length > 0)),
        switchMap((term) => this.http.get(`user?search=${term}`))
      )
      .subscribe((data) => {
        this.searchedUser1 = data;
        this.userGroupId.map((dataId: any) => {
          this.searchedUser1 = this.searchedUser1.filter((data: any) => {
            return data._id != dataId;
          });
        });
      });
  }

  searchUser(event: any) {
    if (event.key == 'Backspace' && this.searchControl.value == '') {
      this.fetchChats();
    }
  }

  sendMessage() {
    this.sockethttp.sendMessage(this.messageText.value);
    this.messageText.reset();
  }

  createChat(userId: any) {
    this.http.post(`chat`, { userId }).subscribe({
      next: (data) => {
        console.log(data);
        this.chat = data;
      },
    });
  }

  getCurrentUser(user: any, i: any) {
    
    if (user?.isGroupChat) {
      return user.chatName;
    }
    return this.loginuser?._id == user.users?.[0]?.['_id']
      ? user.users?.[1]?.['name']
      : user.users?.[0]?.['name'];
  }

  loginUser() {
    return JSON.parse(localStorage.getItem('loginUser')!);
  }

  enterMessage(data: any) {
    if (data.key == 'Enter') {
      this.sendMessage();
    }
  }

  selectUser(userData: any) {
    this.groupAdmin = userData.groupAdmin;
    console.log(userData);
    this.http.patch('chat/group/status', { chatId: userData._id }).subscribe({
      next: (data: any) => {
        console.log(data);
        this.chatDetails = data;
        this.groupUsers = data.users;
        this.fetchChats();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
  }

  addUserToGroup(user: any, userId: any) {
    this.userGroupId = [...this.userGroupId, user._id];
    this.selectedUser = [...this.selectedUser, userId];
    this.groupUserList = [...this.groupUserList, user];
    this.searchUserByKey1();
    this.userStatus1 = false;
    console.log(this.userGroupId);
    this.addUserControl.reset();
  }

  removeUser(i: any) {
    this.groupUserList.splice(i, 1);
    this.selectedUser.splice(i, 1);
    this.userGroupId.splice(i, 1);
  }

  removeUserFromGroup(userId: any) {
    console.log(userId);
    this.http
      .patch(`chat/group/${this.chatDetails._id}`, { userId })
      .subscribe({
        next: (data) => {
          this.tostr.success('Remove user from this group');
          this.fetchChats();
          this.modalRef?.hide();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  createGroupChat() {
    this.groupSubmitFlag = true;

    if (this.createGroup.valid) {
      const payload = {
        chatName: this.createGroup.value.chatName,
        user: this.selectedUser,
      };

      if (this.selectedUser.length < 2) {
        this.tostr.error('At least add 2 user');
        return;
      }

      this.http.post('chat/group', payload).subscribe({
        next: (data) => {
          this.fetchChats();
          this.modalRef?.hide();
          this.tostr.success('Group created successfully');
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
