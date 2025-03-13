import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { heroAcademicCap, heroArrowLeft, heroArrowPath, heroArrowRight, heroCurrencyDollar, heroExclamationTriangle, heroHomeModern, heroMagnifyingGlass, heroPencil, heroPlus, heroTrash, heroXCircle } from '@ng-icons/heroicons/outline';
import { heroArrowSmallLeftSolid, heroArrowSmallRightSolid, heroCheckSolid, heroCurrencyDollarSolid, heroDocumentTextSolid, heroHomeModernSolid, heroHomeSolid, heroMoonSolid, heroPencilSolid, heroSunSolid, heroTrashSolid, heroUserCircleSolid, heroUserGroupSolid, heroUserPlusSolid, heroUserSolid, heroXMarkSolid } from '@ng-icons/heroicons/solid';
import { Input } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ionExit, ionPrint } from '@ng-icons/ionicons';

@Component({
    selector: 'mode-theme-icon',
    template: '<ng-icon [ngStyle]="{ width: size, height: size, color: cor }" name="{{icon}}" />',
    imports: [NgIcon, NgStyle],
    viewProviders: [
        provideIcons({
            featherAirplay,
            heroMoonSolid,
            heroSunSolid,
            heroCheckSolid,
            heroHomeSolid,
            heroAcademicCap,
            heroUserPlusSolid,
            heroUserGroupSolid,
            heroHomeModernSolid,
            heroUserCircleSolid,
            heroUserSolid,
            ionExit,
            heroMagnifyingGlass,
            heroPlus,
            heroArrowSmallRightSolid,
            heroArrowSmallLeftSolid,
            heroXMarkSolid,
            heroPencilSolid,
            heroTrash,
            heroArrowPath,
            heroXCircle,
            heroDocumentTextSolid,
            ionPrint,
            heroHomeModern,
            heroCurrencyDollar,
            heroCurrencyDollarSolid,
            heroTrashSolid,
            heroExclamationTriangle,
            heroArrowLeft,
            heroArrowRight
        })]
})
export class AppComponent {

    @Input() icon: string = ""
    @Input() size: string = ""
    @Input() cor: string = ""

}
