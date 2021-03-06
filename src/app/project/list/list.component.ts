import { Component, OnInit, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProjectItem } from '../../shared/interface/projects.model';
import { InviteComponent } from '../invite/invite.component';
import { NewOrEditProjectComponent } from '../new/newOrEdit.component';
import { slideToRight } from '../../shared/animate/routerTransition';

@Component({
    selector: 'coopwith-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    animations: [slideToRight()]
})
export class ListComponent implements OnInit {

    projects: any[] = [];
    constructor(
        private matDialog: MatDialog
    ) { }

    ngOnInit() {
        this.projects[0] = {
            name: "张旭",
            coverImg: "/assets/common/img/covers/0.jpg",
            desc: "这只是一个简单的项目描述而已..."
        }
    }

    @HostBinding('@routerTransition') state;

    openNewOrEditProjectDialog(): void {
        let dialogRef = this.matDialog.open(NewOrEditProjectComponent, {
            data: ''
        });

        dialogRef
            .afterClosed()
            .subscribe((result: ProjectItem) => {
                console.log(result);
                if (!(result.coverImg && result.desc && result.name)) {
                    return;
                }
                this.projects.push(result);
            })
    }

    toJoinProject(): void {
        let dialogRef = this.matDialog.open(InviteComponent, {
            data: '加入项目！'
        });
    }
}
