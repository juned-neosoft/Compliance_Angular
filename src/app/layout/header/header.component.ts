import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../services/Alertify/alertify.service';
import { AuthService } from '../../services/auth/auth.service';
import { MenusService } from '../../services/Menus/menus.service';
import { timer, Subscription } from "rxjs";

// declare var jquery: any;
// declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public countDown: Subscription;
  public counter = 1800;
  public tick = 1000;

  public userName: string;
  public roleID: number;
  public AuthMenus: any;
  constructor(
    private alertify: AlertifyService,
    private authService: AuthService,
    private menusService: MenusService
  ) {
    this.userName = '';
    this.roleID = 0;
  }

  ngOnInit() {
    this.countDown = timer(0, this.tick).subscribe(() => {
      --this.counter;
      if(this.counter == 0) {
        this.countDown=null;
        this.alertify.error("Your session is expired!! Please login.");
        document.getElementById('SignOutButton').click();
      }
    });

    // $("#homeadmin").click(function () {
    //   $(".module-link").toggleClass("linkopen");
    // });

    this.userName = JSON.parse(localStorage.getItem('user_info')).user_full_name;
    this.roleID = parseInt(JSON.parse(localStorage.getItem('user_info')).app_role_id);

    this.AuthMenus = this.menusService.GetMenus();
  }

  Signout() {
    this.countDown=null;
    this.authService.logoutUser();
  }

  // Old Code
  getSessionTimeout(){
    var countDownDate = this.addMinutes(new Date(), 30).getTime();
  
    var x = setInterval(function() {
    
      var now = new Date().getTime();
    
      var distance = countDownDate - now;
    
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
      if(document.getElementById("SessionCounter").innerHTML == null)
        clearInterval(x);
      document.getElementById("SessionCounter").innerHTML = " | " + minutes + "m " + seconds + "s ";
    
      if (distance < 0) {
        clearInterval(x);
        alert("Your session is expired!! Please login.");
        document.getElementById('SignOutButton').click();
        document.getElementById("SessionCounter").innerHTML = " | " + "EXPIRED SESSION";
      }
    }, 1000);
  }
  
    addMinutes(date, minutes) {
      return new Date(date.getTime() + minutes*60000);
    }

}