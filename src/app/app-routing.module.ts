import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ManagementComponent } from './management/management.component';
import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';
import { ChannelsComponent } from './channels/channels.component';
import { ChatComponent } from './chat/chat.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'management', component: ManagementComponent},
  {path: "users", component: UsersComponent},
  {path: "groups", component: GroupsComponent},
  {path: "channels/:group", component: ChannelsComponent},
  {path: "chat", component: ChatComponent},
  {path: "chat-room/:group/:channel", component: ChatRoomComponent},
  {path: "CreateChannel", component: CreateChannelComponent},
  {path: "CreateUser", component: CreateUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
