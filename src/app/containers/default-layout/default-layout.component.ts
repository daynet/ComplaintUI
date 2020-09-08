import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor( private router: Router,@Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
      
    });
  }
  
  

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  roleMatch(): boolean
  {
    var ismatch = false;
     var roles =   localStorage.getItem('department');

     var role =  localStorage.getItem('departments');

     
     if(roles != 'Student')
       if(roles != 'null' || role == 'Admin')
       //if(role == 'Admin')
     {
       ismatch =  true;
       return ismatch;
       return false;
     }
     //localStorage.removeItem('department');
     return ismatch;


  }
  Logout()
{
  localStorage.removeItem('token');
  localStorage.removeItem('department');
  this.router.navigate(['/login']);
}


   
}
