import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {forkJoin, Observable, of} from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { bdInitialAssignments } from '../assignments/data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments: Assignment[];

  data: Assignment[] = [{id: 1, nom: 'Solarbreeze', dateDeRendu: new Date('5/28/2020'), rendu: true},
    {id: 2, nom: 'Viva', dateDeRendu: new Date('6/9/2020'), rendu: true},
    {id: 3, nom: 'Voltsillam', dateDeRendu: new Date('11/9/2020'), rendu: true},
    {id: 4, nom: 'Konklux', dateDeRendu: new Date('12/25/2020'), rendu: true},
    {id: 5, nom: 'Aerified', dateDeRendu: new Date('6/23/2020'), rendu: true},
    {id: 6, nom: 'Greenlam', dateDeRendu: new Date('9/8/2020'), rendu: true},
    {id: 7, nom: 'Biodex', dateDeRendu: new Date('12/13/2020'), rendu: true},
    {id: 8, nom: 'Prodder', dateDeRendu: new Date('10/12/2020'), rendu: true},
    {id: 9, nom: 'Mat Lam Tam', dateDeRendu: new Date('8/29/2020'), rendu: false},
    {id: 10, nom: 'Rank', dateDeRendu: new Date('10/9/2020'), rendu: true},
    {id: 11, nom: 'Overhold', dateDeRendu: new Date('3/26/2020'), rendu: true},
    {id: 12, nom: 'Biodex', dateDeRendu: new Date('7/4/2020'), rendu: false},
    {id: 13, nom: 'Voltsillam', dateDeRendu: new Date('4/5/2020'), rendu: true},
    {id: 14, nom: 'Keylex', dateDeRendu: new Date('4/19/2020'), rendu: true},
    {id: 15, nom: 'Ventosanzap', dateDeRendu: new Date('2/17/2021'), rendu: false},
    {id: 16, nom: 'Asoka', dateDeRendu: new Date('1/14/2021'), rendu: false},
    {id: 17, nom: 'Lotstring', dateDeRendu: new Date('5/16/2020'), rendu: true},
    {id: 18, nom: 'Bytecard', dateDeRendu: new Date('2/22/2021'), rendu: false},
    {id: 19, nom: 'Y-Solowarm', dateDeRendu: new Date('6/16/2020'), rendu: false},
    {id: 20, nom: 'Hatity', dateDeRendu: new Date('10/15/2020'), rendu: false},
    {id: 21, nom: 'Bytecard', dateDeRendu: new Date('5/9/2020'), rendu: true},
    {id: 22, nom: 'Regrant', dateDeRendu: new Date('2/21/2021'), rendu: false},
    {id: 23, nom: 'Bigtax', dateDeRendu: new Date('1/3/2021'), rendu: false},
    {id: 24, nom: 'Stringtough', dateDeRendu: new Date('11/28/2020'), rendu: true},
    {id: 25, nom: 'Prodder', dateDeRendu: new Date('7/14/2020'), rendu: false},
    {id: 26, nom: 'Opela', dateDeRendu: new Date('7/6/2020'), rendu: true},
    {id: 27, nom: 'Domainer', dateDeRendu: new Date('4/6/2020'), rendu: false},
    {id: 28, nom: 'Stringtough', dateDeRendu: new Date('10/10/2020'), rendu: false},
    {id: 29, nom: 'Gembucket', dateDeRendu: new Date('5/30/2020'), rendu: false},
    {id: 30, nom: 'Sonsing', dateDeRendu: new Date('10/6/2020'), rendu: false},
    {id: 31, nom: 'Flowdesk', dateDeRendu: new Date('3/29/2020'), rendu: false},
    {id: 32, nom: 'Duobam', dateDeRendu: new Date('8/25/2020'), rendu: false},
    {id: 33, nom: 'Bitwolf', dateDeRendu: new Date('11/9/2020'), rendu: false},
    {id: 34, nom: 'Bigtax', dateDeRendu: new Date('9/17/2020'), rendu: true},
    {id: 35, nom: 'Sub-Ex', dateDeRendu: new Date('9/21/2020'), rendu: true},
    {id: 36, nom: 'Stronghold', dateDeRendu: new Date('10/25/2020'), rendu: true},
    {id: 37, nom: 'Greenlam', dateDeRendu: new Date('8/18/2020'), rendu: false},
    {id: 38, nom: 'Sonsing', dateDeRendu: new Date('10/11/2020'), rendu: true},
    {id: 39, nom: 'Domainer', dateDeRendu: new Date('11/19/2020'), rendu: true},
    {id: 40, nom: 'Fintone', dateDeRendu: new Date('1/30/2021'), rendu: false},
    {id: 41, nom: 'Veribet', dateDeRendu: new Date('3/7/2021'), rendu: true},
    {id: 42, nom: 'Pannier', dateDeRendu: new Date('11/10/2020'), rendu: false},
    {id: 43, nom: 'Vagram', dateDeRendu: new Date('9/18/2020'), rendu: true},
    {id: 44, nom: 'Zontrax', dateDeRendu: new Date('9/18/2020'), rendu: true},
    {id: 45, nom: 'Overhold', dateDeRendu: new Date('10/26/2020'), rendu: true},
    {id: 46, nom: 'Stim', dateDeRendu: new Date('5/26/2020'), rendu: false},
    {id: 47, nom: 'Treeflex', dateDeRendu: new Date('9/22/2020'), rendu: false},
    {id: 48, nom: 'Toughjoyfax', dateDeRendu: new Date('8/18/2020'), rendu: false},
    {id: 49, nom: 'Lotstring', dateDeRendu: new Date('4/7/2020'), rendu: false},
    {id: 50, nom: 'Matsoft', dateDeRendu: new Date('5/17/2020'), rendu: true},
    {id: 51, nom: 'Sub-Ex', dateDeRendu: new Date('10/23/2020'), rendu: false},
    {id: 52, nom: 'Y-find', dateDeRendu: new Date('2/3/2021'), rendu: false},
    {id: 53, nom: 'Y-Solowarm', dateDeRendu: new Date('2/2/2021'), rendu: true},
    {id: 54, nom: 'Wrapsafe', dateDeRendu: new Date('8/10/2020'), rendu: true},
    {id: 55, nom: 'Daltfresh', dateDeRendu: new Date('9/24/2020'), rendu: false},
    {id: 56, nom: 'Biodex', dateDeRendu: new Date('8/1/2020'), rendu: true},
    {id: 57, nom: 'Treeflex', dateDeRendu: new Date('7/8/2020'), rendu: true},
    {id: 58, nom: 'Lotlux', dateDeRendu: new Date('3/22/2020'), rendu: false},
    {id: 59, nom: 'Aerified', dateDeRendu: new Date('3/28/2020'), rendu: false},
    {id: 60, nom: 'Vagram', dateDeRendu: new Date('6/5/2020'), rendu: true},
    {id: 61, nom: 'Home Ing', dateDeRendu: new Date('7/17/2020'), rendu: true},
    {id: 62, nom: 'Tresom', dateDeRendu: new Date('7/10/2020'), rendu: true},
    {id: 63, nom: 'Treeflex', dateDeRendu: new Date('6/27/2020'), rendu: false},
    {id: 64, nom: 'Cardguard', dateDeRendu: new Date('12/1/2020'), rendu: false},
    {id: 65, nom: 'Tampflex', dateDeRendu: new Date('10/5/2020'), rendu: false},
    {id: 66, nom: 'Alphazap', dateDeRendu: new Date('1/19/2021'), rendu: true},
    {id: 67, nom: 'Tin', dateDeRendu: new Date('2/25/2021'), rendu: true},
    {id: 68, nom: 'Bigtax', dateDeRendu: new Date('2/1/2021'), rendu: true},
    {id: 69, nom: 'Hatity', dateDeRendu: new Date('12/27/2020'), rendu: true},
    {id: 70, nom: 'Y-find', dateDeRendu: new Date('6/27/2020'), rendu: true},
    {id: 71, nom: 'Namfix', dateDeRendu: new Date('8/3/2020'), rendu: false},
    {id: 72, nom: 'Voltsillam', dateDeRendu: new Date('6/1/2020'), rendu: false},
    {id: 73, nom: 'It', dateDeRendu: new Date('1/25/2021'), rendu: false},
    {id: 74, nom: 'Hatity', dateDeRendu: new Date('10/28/2020'), rendu: true},
    {id: 75, nom: 'Home Ing', dateDeRendu: new Date('6/2/2020'), rendu: true},
    {id: 76, nom: 'Stringtough', dateDeRendu: new Date('12/14/2020'), rendu: false},
    {id: 77, nom: 'Andalax', dateDeRendu: new Date('3/10/2020'), rendu: true},
    {id: 78, nom: 'Greenlam', dateDeRendu: new Date('9/15/2020'), rendu: true},
    {id: 79, nom: 'Latlux', dateDeRendu: new Date('12/19/2020'), rendu: true},
    {id: 80, nom: 'Zamit', dateDeRendu: new Date('5/14/2020'), rendu: true},
    {id: 81, nom: 'Alphazap', dateDeRendu: new Date('6/15/2020'), rendu: true},
    {id: 82, nom: 'Wrapsafe', dateDeRendu: new Date('1/2/2021'), rendu: true},
    {id: 83, nom: 'Greenlam', dateDeRendu: new Date('10/12/2020'), rendu: false},
    {id: 84, nom: 'Pannier', dateDeRendu: new Date('2/8/2021'), rendu: false},
    {id: 85, nom: 'Fintone', dateDeRendu: new Date('6/20/2020'), rendu: true},
    {id: 86, nom: 'Solarbreeze', dateDeRendu: new Date('7/4/2020'), rendu: true},
    {id: 87, nom: 'Tres-Zap', dateDeRendu: new Date('9/8/2020'), rendu: true},
    {id: 88, nom: 'Voyatouch', dateDeRendu: new Date('3/8/2021'), rendu: false},
    {id: 89, nom: 'Span', dateDeRendu: new Date('2/6/2021'), rendu: false},
    {id: 90, nom: 'Aerified', dateDeRendu: new Date('1/28/2021'), rendu: true},
    {id: 91, nom: 'Overhold', dateDeRendu: new Date('12/22/2020'), rendu: false},
    {id: 92, nom: 'Y-find', dateDeRendu: new Date('8/24/2020'), rendu: true},
    {id: 93, nom: 'Home Ing', dateDeRendu: new Date('7/5/2020'), rendu: true},
    {id: 94, nom: 'Tin', dateDeRendu: new Date('12/27/2020'), rendu: true},
    {id: 95, nom: 'Flowdesk', dateDeRendu: new Date('11/30/2020'), rendu: false},
    {id: 96, nom: 'Flexidy', dateDeRendu: new Date('4/20/2020'), rendu: true},
    {id: 97, nom: 'Domainer', dateDeRendu: new Date('9/8/2020'), rendu: false},
    {id: 98, nom: 'Temp', dateDeRendu: new Date('12/20/2020'), rendu: true},
    {id: 99, nom: 'Home Ing', dateDeRendu: new Date('12/16/2020'), rendu: true},
    {id: 100, nom: 'Overhold', dateDeRendu: new Date('2/2/2021'), rendu: false},
    {id: 101, nom: 'Namfix', dateDeRendu: new Date('12/28/2020'), rendu: false},
    {id: 102, nom: 'Tres-Zap', dateDeRendu: new Date('2/28/2021'), rendu: true},
    {id: 103, nom: 'Stim', dateDeRendu: new Date('3/15/2020'), rendu: false},
    {id: 104, nom: 'Tin', dateDeRendu: new Date('11/15/2020'), rendu: false},
    {id: 105, nom: 'Opela', dateDeRendu: new Date('4/8/2020'), rendu: false},
    {id: 106, nom: 'Bigtax', dateDeRendu: new Date('9/10/2020'), rendu: false},
    {id: 107, nom: 'Trippledex', dateDeRendu: new Date('11/16/2020'), rendu: false},
    {id: 108, nom: 'Job', dateDeRendu: new Date('8/21/2020'), rendu: false},
    {id: 109, nom: 'Lotlux', dateDeRendu: new Date('5/14/2020'), rendu: false},
    {id: 110, nom: 'Alphazap', dateDeRendu: new Date('3/17/2020'), rendu: true},
    {id: 111, nom: 'Tempsoft', dateDeRendu: new Date('5/27/2020'), rendu: true},
    {id: 112, nom: 'Andalax', dateDeRendu: new Date('1/27/2021'), rendu: true},
    {id: 113, nom: 'Tresom', dateDeRendu: new Date('11/8/2020'), rendu: false},
    {id: 114, nom: 'Greenlam', dateDeRendu: new Date('9/9/2020'), rendu: false},
    {id: 115, nom: 'Job', dateDeRendu: new Date('9/20/2020'), rendu: true},
    {id: 116, nom: 'Sonair', dateDeRendu: new Date('3/17/2020'), rendu: false},
    {id: 117, nom: 'Viva', dateDeRendu: new Date('5/16/2020'), rendu: true},
    {id: 118, nom: 'Fintone', dateDeRendu: new Date('10/25/2020'), rendu: false},
    {id: 119, nom: 'Tin', dateDeRendu: new Date('12/19/2020'), rendu: true},
    {id: 120, nom: 'Cardguard', dateDeRendu: new Date('4/7/2020'), rendu: true},
    {id: 121, nom: 'Duobam', dateDeRendu: new Date('1/25/2021'), rendu: false},
    {id: 122, nom: 'Zontrax', dateDeRendu: new Date('12/16/2020'), rendu: true},
    {id: 123, nom: 'Holdlamis', dateDeRendu: new Date('8/30/2020'), rendu: true},
    {id: 124, nom: 'Regrant', dateDeRendu: new Date('6/21/2020'), rendu: true},
    {id: 125, nom: 'Mat Lam Tam', dateDeRendu: new Date('2/9/2021'), rendu: false},
    {id: 126, nom: 'Zontrax', dateDeRendu: new Date('9/29/2020'), rendu: true},
    {id: 127, nom: 'Matsoft', dateDeRendu: new Date('1/20/2021'), rendu: false},
    {id: 128, nom: 'Hatity', dateDeRendu: new Date('5/28/2020'), rendu: true},
    {id: 129, nom: 'Temp', dateDeRendu: new Date('6/25/2020'), rendu: true},
    {id: 130, nom: 'Opela', dateDeRendu: new Date('8/5/2020'), rendu: false},
    {id: 131, nom: 'Trippledex', dateDeRendu: new Date('12/12/2020'), rendu: false},
    {id: 132, nom: 'Tampflex', dateDeRendu: new Date('7/9/2020'), rendu: false},
    {id: 133, nom: 'Daltfresh', dateDeRendu: new Date('8/7/2020'), rendu: false},
    {id: 134, nom: 'Regrant', dateDeRendu: new Date('10/28/2020'), rendu: false},
    {id: 135, nom: 'Zontrax', dateDeRendu: new Date('6/12/2020'), rendu: true},
    {id: 136, nom: 'Y-find', dateDeRendu: new Date('12/2/2020'), rendu: true},
    {id: 137, nom: 'Job', dateDeRendu: new Date('1/27/2021'), rendu: true},
    {id: 138, nom: 'Biodex', dateDeRendu: new Date('5/3/2020'), rendu: false},
    {id: 139, nom: 'Holdlamis', dateDeRendu: new Date('10/3/2020'), rendu: false},
    {id: 140, nom: 'Latlux', dateDeRendu: new Date('1/25/2021'), rendu: true},
    {id: 141, nom: 'Cardguard', dateDeRendu: new Date('8/16/2020'), rendu: false},
    {id: 142, nom: 'Asoka', dateDeRendu: new Date('11/25/2020'), rendu: false},
    {id: 143, nom: 'Solarbreeze', dateDeRendu: new Date('7/21/2020'), rendu: true},
    {id: 144, nom: 'Prodder', dateDeRendu: new Date('7/16/2020'), rendu: false},
    {id: 145, nom: 'Biodex', dateDeRendu: new Date('2/21/2021'), rendu: false},
    {id: 146, nom: 'Zaam-Dox', dateDeRendu: new Date('12/8/2020'), rendu: true},
    {id: 147, nom: 'Aerified', dateDeRendu: new Date('1/4/2021'), rendu: false},
    {id: 148, nom: 'Flowdesk', dateDeRendu: new Date('9/8/2020'), rendu: false},
    {id: 149, nom: 'Konklab', dateDeRendu: new Date('11/4/2020'), rendu: true},
    {id: 150, nom: 'Tres-Zap', dateDeRendu: new Date('8/13/2020'), rendu: false},
    {id: 151, nom: 'Sonsing', dateDeRendu: new Date('11/12/2020'), rendu: false},
    {id: 152, nom: 'Tampflex', dateDeRendu: new Date('8/26/2020'), rendu: true},
    {id: 153, nom: 'Fixflex', dateDeRendu: new Date('1/2/2021'), rendu: true},
    {id: 154, nom: 'Flowdesk', dateDeRendu: new Date('7/10/2020'), rendu: true},
    {id: 155, nom: 'Lotlux', dateDeRendu: new Date('9/26/2020'), rendu: true},
    {id: 156, nom: 'Hatity', dateDeRendu: new Date('5/28/2020'), rendu: true},
    {id: 157, nom: 'Y-Solowarm', dateDeRendu: new Date('1/14/2021'), rendu: false},
    {id: 158, nom: 'Trippledex', dateDeRendu: new Date('11/9/2020'), rendu: false},
    {id: 159, nom: 'Regrant', dateDeRendu: new Date('12/11/2020'), rendu: false},
    {id: 160, nom: 'Pannier', dateDeRendu: new Date('9/15/2020'), rendu: true},
    {id: 161, nom: 'Y-Solowarm', dateDeRendu: new Date('2/27/2021'), rendu: true},
    {id: 162, nom: 'Stim', dateDeRendu: new Date('4/22/2020'), rendu: false},
    {id: 163, nom: 'Cardguard', dateDeRendu: new Date('10/27/2020'), rendu: true},
    {id: 164, nom: 'Zontrax', dateDeRendu: new Date('6/25/2020'), rendu: false},
    {id: 165, nom: 'Fixflex', dateDeRendu: new Date('9/21/2020'), rendu: true},
    {id: 166, nom: 'Cookley', dateDeRendu: new Date('8/10/2020'), rendu: false},
    {id: 167, nom: 'Subin', dateDeRendu: new Date('10/30/2020'), rendu: true},
    {id: 168, nom: 'Opela', dateDeRendu: new Date('5/29/2020'), rendu: true},
    {id: 169, nom: 'Fintone', dateDeRendu: new Date('6/11/2020'), rendu: true},
    {id: 170, nom: 'Home Ing', dateDeRendu: new Date('6/29/2020'), rendu: false},
    {id: 171, nom: 'Temp', dateDeRendu: new Date('12/15/2020'), rendu: true},
    {id: 172, nom: 'Stronghold', dateDeRendu: new Date('12/16/2020'), rendu: false},
    {id: 173, nom: 'Y-Solowarm', dateDeRendu: new Date('6/5/2020'), rendu: false},
    {id: 174, nom: 'Bytecard', dateDeRendu: new Date('8/30/2020'), rendu: false},
    {id: 175, nom: 'Biodex', dateDeRendu: new Date('9/13/2020'), rendu: true},
    {id: 176, nom: 'Mat Lam Tam', dateDeRendu: new Date('6/5/2020'), rendu: false},
    {id: 177, nom: 'Stim', dateDeRendu: new Date('1/17/2021'), rendu: false},
    {id: 178, nom: 'Toughjoyfax', dateDeRendu: new Date('11/19/2020'), rendu: true},
    {id: 179, nom: 'Aerified', dateDeRendu: new Date('7/23/2020'), rendu: true},
    {id: 180, nom: 'Stim', dateDeRendu: new Date('8/19/2020'), rendu: true},
    {id: 181, nom: 'Keylex', dateDeRendu: new Date('2/25/2021'), rendu: true},
    {id: 182, nom: 'Andalax', dateDeRendu: new Date('5/26/2020'), rendu: false},
    {id: 183, nom: 'Trippledex', dateDeRendu: new Date('2/3/2021'), rendu: false},
    {id: 184, nom: 'Zontrax', dateDeRendu: new Date('11/5/2020'), rendu: false},
    {id: 185, nom: 'Solarbreeze', dateDeRendu: new Date('7/1/2020'), rendu: true},
    {id: 186, nom: 'Stringtough', dateDeRendu: new Date('8/16/2020'), rendu: false},
    {id: 187, nom: 'Cardguard', dateDeRendu: new Date('12/25/2020'), rendu: false},
    {id: 188, nom: 'Temp', dateDeRendu: new Date('5/18/2020'), rendu: false},
    {id: 189, nom: 'Namfix', dateDeRendu: new Date('10/17/2020'), rendu: false},
    {id: 190, nom: 'Temp', dateDeRendu: new Date('12/20/2020'), rendu: false},
    {id: 191, nom: 'Sonsing', dateDeRendu: new Date('7/3/2020'), rendu: true},
    {id: 192, nom: 'Biodex', dateDeRendu: new Date('8/22/2020'), rendu: false},
    {id: 193, nom: 'Wrapsafe', dateDeRendu: new Date('2/26/2021'), rendu: false},
    {id: 194, nom: 'Zoolab', dateDeRendu: new Date('7/31/2020'), rendu: false},
    {id: 195, nom: 'Lotlux', dateDeRendu: new Date('9/20/2020'), rendu: true},
    {id: 196, nom: 'Domainer', dateDeRendu: new Date('10/17/2020'), rendu: true},
    {id: 197, nom: 'Daltfresh', dateDeRendu: new Date('5/8/2020'), rendu: true},
    {id: 198, nom: 'Toughjoyfax', dateDeRendu: new Date('7/24/2020'), rendu: false},
    {id: 199, nom: 'Konklab', dateDeRendu: new Date('1/17/2021'), rendu: false},
    {id: 200, nom: 'Keylex', dateDeRendu: new Date('9/25/2020'), rendu: false},
    {id: 201, nom: 'Ventosanzap', dateDeRendu: new Date('8/30/2020'), rendu: false},
    {id: 202, nom: 'Alpha', dateDeRendu: new Date('2/25/2021'), rendu: false},
    {id: 203, nom: 'Ronstring', dateDeRendu: new Date('5/4/2020'), rendu: false},
    {id: 204, nom: 'Gembucket', dateDeRendu: new Date('2/9/2021'), rendu: false},
    {id: 205, nom: 'Asoka', dateDeRendu: new Date('5/19/2020'), rendu: false},
    {id: 206, nom: 'Y-find', dateDeRendu: new Date('12/14/2020'), rendu: true},
    {id: 207, nom: 'Sonsing', dateDeRendu: new Date('12/24/2020'), rendu: false},
    {id: 208, nom: 'Stringtough', dateDeRendu: new Date('11/23/2020'), rendu: true},
    {id: 209, nom: 'Cardify', dateDeRendu: new Date('12/1/2020'), rendu: false},
    {id: 210, nom: 'Sonsing', dateDeRendu: new Date('12/23/2020'), rendu: false},
    {id: 211, nom: 'Toughjoyfax', dateDeRendu: new Date('7/21/2020'), rendu: false},
    {id: 212, nom: 'Zaam-Dox', dateDeRendu: new Date('8/13/2020'), rendu: false},
    {id: 213, nom: 'Regrant', dateDeRendu: new Date('6/3/2020'), rendu: true},
    {id: 214, nom: 'Job', dateDeRendu: new Date('3/17/2020'), rendu: true},
    {id: 215, nom: 'Fix San', dateDeRendu: new Date('9/5/2020'), rendu: false},
    {id: 216, nom: 'Stronghold', dateDeRendu: new Date('10/22/2020'), rendu: true},
    {id: 217, nom: 'Job', dateDeRendu: new Date('11/7/2020'), rendu: false},
    {id: 218, nom: 'Bytecard', dateDeRendu: new Date('2/22/2021'), rendu: true},
    {id: 219, nom: 'Temp', dateDeRendu: new Date('1/29/2021'), rendu: true},
    {id: 220, nom: 'Greenlam', dateDeRendu: new Date('11/4/2020'), rendu: true},
    {id: 221, nom: 'Flexidy', dateDeRendu: new Date('1/18/2021'), rendu: false},
    {id: 222, nom: 'Wrapsafe', dateDeRendu: new Date('11/11/2020'), rendu: false},
    {id: 223, nom: 'Job', dateDeRendu: new Date('11/7/2020'), rendu: false},
    {id: 224, nom: 'It', dateDeRendu: new Date('4/21/2020'), rendu: true},
    {id: 225, nom: 'Tresom', dateDeRendu: new Date('6/18/2020'), rendu: false},
    {id: 226, nom: 'Rank', dateDeRendu: new Date('1/29/2021'), rendu: false},
    {id: 227, nom: 'Toughjoyfax', dateDeRendu: new Date('1/6/2021'), rendu: true},
    {id: 228, nom: 'Cardify', dateDeRendu: new Date('2/18/2021'), rendu: true},
    {id: 229, nom: 'Tin', dateDeRendu: new Date('7/29/2020'), rendu: false},
    {id: 230, nom: 'Alphazap', dateDeRendu: new Date('3/8/2021'), rendu: true},
    {id: 231, nom: 'Cookley', dateDeRendu: new Date('1/22/2021'), rendu: true},
    {id: 232, nom: 'Aerified', dateDeRendu: new Date('11/11/2020'), rendu: true},
    {id: 233, nom: 'Tin', dateDeRendu: new Date('3/30/2020'), rendu: true},
    {id: 234, nom: 'Latlux', dateDeRendu: new Date('6/2/2020'), rendu: true},
    {id: 235, nom: 'Konklab', dateDeRendu: new Date('2/18/2021'), rendu: true},
    {id: 236, nom: 'Zoolab', dateDeRendu: new Date('6/28/2020'), rendu: true},
    {id: 237, nom: 'Bigtax', dateDeRendu: new Date('10/21/2020'), rendu: true},
    {id: 238, nom: 'Namfix', dateDeRendu: new Date('9/1/2020'), rendu: false},
    {id: 239, nom: 'Konklux', dateDeRendu: new Date('4/27/2020'), rendu: true},
    {id: 240, nom: 'Bytecard', dateDeRendu: new Date('6/25/2020'), rendu: true},
    {id: 241, nom: 'Ventosanzap', dateDeRendu: new Date('3/14/2020'), rendu: false},
    {id: 242, nom: 'Voltsillam', dateDeRendu: new Date('8/18/2020'), rendu: false},
    {id: 243, nom: 'Voltsillam', dateDeRendu: new Date('6/10/2020'), rendu: false},
    {id: 244, nom: 'Fix San', dateDeRendu: new Date('5/2/2020'), rendu: true},
    {id: 245, nom: 'Veribet', dateDeRendu: new Date('7/27/2020'), rendu: false},
    {id: 246, nom: 'Y-find', dateDeRendu: new Date('11/5/2020'), rendu: false},
    {id: 247, nom: 'Ronstring', dateDeRendu: new Date('4/4/2020'), rendu: false},
    {id: 248, nom: 'Aerified', dateDeRendu: new Date('8/30/2020'), rendu: false},
    {id: 249, nom: 'Hatity', dateDeRendu: new Date('1/23/2021'), rendu: true},
    {id: 250, nom: 'Duobam', dateDeRendu: new Date('3/26/2020'), rendu: true},
    {id: 251, nom: 'Subin', dateDeRendu: new Date('4/14/2020'), rendu: true},
    {id: 252, nom: 'Zamit', dateDeRendu: new Date('3/19/2020'), rendu: false},
    {id: 253, nom: 'Ventosanzap', dateDeRendu: new Date('9/28/2020'), rendu: true},
    {id: 254, nom: 'Konklux', dateDeRendu: new Date('5/23/2020'), rendu: true},
    {id: 255, nom: 'Lotstring', dateDeRendu: new Date('2/26/2021'), rendu: false},
    {id: 256, nom: 'Latlux', dateDeRendu: new Date('5/9/2020'), rendu: true},
    {id: 257, nom: 'Andalax', dateDeRendu: new Date('3/2/2021'), rendu: true},
    {id: 258, nom: 'Cardguard', dateDeRendu: new Date('8/21/2020'), rendu: false},
    {id: 259, nom: 'Redhold', dateDeRendu: new Date('6/16/2020'), rendu: true},
    {id: 260, nom: 'Keylex', dateDeRendu: new Date('10/25/2020'), rendu: false},
    {id: 261, nom: 'Toughjoyfax', dateDeRendu: new Date('10/25/2020'), rendu: true},
    {id: 262, nom: 'Treeflex', dateDeRendu: new Date('3/13/2020'), rendu: true},
    {id: 263, nom: 'Bitwolf', dateDeRendu: new Date('11/21/2020'), rendu: false},
    {id: 264, nom: 'Solarbreeze', dateDeRendu: new Date('8/28/2020'), rendu: true},
    {id: 265, nom: 'Duobam', dateDeRendu: new Date('8/2/2020'), rendu: false},
    {id: 266, nom: 'Quo Lux', dateDeRendu: new Date('5/23/2020'), rendu: true},
    {id: 267, nom: 'Temp', dateDeRendu: new Date('12/28/2020'), rendu: false},
    {id: 268, nom: 'Stim', dateDeRendu: new Date('3/1/2021'), rendu: true},
    {id: 269, nom: 'Duobam', dateDeRendu: new Date('11/24/2020'), rendu: false},
    {id: 270, nom: 'Stronghold', dateDeRendu: new Date('11/13/2020'), rendu: true},
    {id: 271, nom: 'Pannier', dateDeRendu: new Date('5/9/2020'), rendu: true},
    {id: 272, nom: 'Zathin', dateDeRendu: new Date('2/1/2021'), rendu: true},
    {id: 273, nom: 'Zoolab', dateDeRendu: new Date('1/26/2021'), rendu: true},
    {id: 274, nom: 'Pannier', dateDeRendu: new Date('12/18/2020'), rendu: true},
    {id: 275, nom: 'Ronstring', dateDeRendu: new Date('3/11/2020'), rendu: false},
    {id: 276, nom: 'Konklux', dateDeRendu: new Date('5/17/2020'), rendu: true},
    {id: 277, nom: 'Keylex', dateDeRendu: new Date('6/6/2020'), rendu: false},
    {id: 278, nom: 'Sonair', dateDeRendu: new Date('9/12/2020'), rendu: false},
    {id: 279, nom: 'Bitchip', dateDeRendu: new Date('10/21/2020'), rendu: true},
    {id: 280, nom: 'Latlux', dateDeRendu: new Date('4/10/2020'), rendu: false},
    {id: 281, nom: 'Treeflex', dateDeRendu: new Date('12/21/2020'), rendu: false},
    {id: 282, nom: 'Solarbreeze', dateDeRendu: new Date('6/14/2020'), rendu: false},
    {id: 283, nom: 'Stim', dateDeRendu: new Date('5/23/2020'), rendu: true},
    {id: 284, nom: 'Tempsoft', dateDeRendu: new Date('1/18/2021'), rendu: true},
    {id: 285, nom: 'Veribet', dateDeRendu: new Date('6/22/2020'), rendu: true},
    {id: 286, nom: 'Gembucket', dateDeRendu: new Date('1/19/2021'), rendu: false},
    {id: 287, nom: 'Aerified', dateDeRendu: new Date('6/4/2020'), rendu: true},
    {id: 288, nom: 'Overhold', dateDeRendu: new Date('12/2/2020'), rendu: true},
    {id: 289, nom: 'Pannier', dateDeRendu: new Date('7/10/2020'), rendu: true},
    {id: 290, nom: 'Duobam', dateDeRendu: new Date('2/8/2021'), rendu: false},
    {id: 291, nom: 'Bigtax', dateDeRendu: new Date('2/12/2021'), rendu: false},
    {id: 292, nom: 'Zaam-Dox', dateDeRendu: new Date('1/15/2021'), rendu: false},
    {id: 293, nom: 'Flexidy', dateDeRendu: new Date('3/5/2021'), rendu: true},
    {id: 294, nom: 'Sonair', dateDeRendu: new Date('4/5/2020'), rendu: true},
    {id: 295, nom: 'Voltsillam', dateDeRendu: new Date('3/7/2021'), rendu: true},
    {id: 296, nom: 'Prodder', dateDeRendu: new Date('1/20/2021'), rendu: false},
    {id: 297, nom: 'Stim', dateDeRendu: new Date('10/2/2020'), rendu: false},
    {id: 298, nom: 'Bitwolf', dateDeRendu: new Date('7/31/2020'), rendu: false},
    {id: 299, nom: 'Sub-Ex', dateDeRendu: new Date('3/18/2020'), rendu: false},
    {id: 300, nom: 'Domainer', dateDeRendu: new Date('9/14/2020'), rendu: true},
    {id: 301, nom: 'Sonsing', dateDeRendu: new Date('5/27/2020'), rendu: false},
    {id: 302, nom: 'Flexidy', dateDeRendu: new Date('5/30/2020'), rendu: true},
    {id: 303, nom: 'Regrant', dateDeRendu: new Date('11/26/2020'), rendu: true},
    {id: 304, nom: 'Lotstring', dateDeRendu: new Date('11/24/2020'), rendu: true},
    {id: 305, nom: 'Home Ing', dateDeRendu: new Date('9/24/2020'), rendu: false},
    {id: 306, nom: 'Opela', dateDeRendu: new Date('9/30/2020'), rendu: true},
    {id: 307, nom: 'Konklux', dateDeRendu: new Date('6/20/2020'), rendu: false},
    {id: 308, nom: 'Redhold', dateDeRendu: new Date('5/4/2020'), rendu: false},
    {id: 309, nom: 'Bamity', dateDeRendu: new Date('1/4/2021'), rendu: false},
    {id: 310, nom: 'Biodex', dateDeRendu: new Date('9/20/2020'), rendu: true},
    {id: 311, nom: 'Tres-Zap', dateDeRendu: new Date('11/15/2020'), rendu: true},
    {id: 312, nom: 'Quo Lux', dateDeRendu: new Date('12/15/2020'), rendu: true},
    {id: 313, nom: 'Lotstring', dateDeRendu: new Date('3/15/2020'), rendu: true},
    {id: 314, nom: 'Tin', dateDeRendu: new Date('3/28/2020'), rendu: false},
    {id: 315, nom: 'Biodex', dateDeRendu: new Date('1/23/2021'), rendu: false},
    {id: 316, nom: 'Cardguard', dateDeRendu: new Date('8/4/2020'), rendu: true},
    {id: 317, nom: 'Latlux', dateDeRendu: new Date('9/16/2020'), rendu: false},
    {id: 318, nom: 'Rank', dateDeRendu: new Date('1/1/2021'), rendu: false},
    {id: 319, nom: 'Bitwolf', dateDeRendu: new Date('12/8/2020'), rendu: false},
    {id: 320, nom: 'Daltfresh', dateDeRendu: new Date('5/18/2020'), rendu: false},
    {id: 321, nom: 'Treeflex', dateDeRendu: new Date('4/17/2020'), rendu: true},
    {id: 322, nom: 'Y-Solowarm', dateDeRendu: new Date('1/18/2021'), rendu: false},
    {id: 323, nom: 'Opela', dateDeRendu: new Date('10/21/2020'), rendu: true},
    {id: 324, nom: 'Opela', dateDeRendu: new Date('8/25/2020'), rendu: true},
    {id: 325, nom: 'Sonair', dateDeRendu: new Date('5/27/2020'), rendu: true},
    {id: 326, nom: 'Tempsoft', dateDeRendu: new Date('5/22/2020'), rendu: true},
    {id: 327, nom: 'Greenlam', dateDeRendu: new Date('9/21/2020'), rendu: true},
    {id: 328, nom: 'Hatity', dateDeRendu: new Date('11/30/2020'), rendu: true},
    {id: 329, nom: 'Vagram', dateDeRendu: new Date('8/12/2020'), rendu: true},
    {id: 330, nom: 'Bitchip', dateDeRendu: new Date('3/18/2020'), rendu: true},
    {id: 331, nom: 'Keylex', dateDeRendu: new Date('1/3/2021'), rendu: false},
    {id: 332, nom: 'Konklab', dateDeRendu: new Date('10/1/2020'), rendu: true},
    {id: 333, nom: 'Konklux', dateDeRendu: new Date('11/10/2020'), rendu: false},
    {id: 334, nom: 'Veribet', dateDeRendu: new Date('4/13/2020'), rendu: false},
    {id: 335, nom: 'Transcof', dateDeRendu: new Date('12/14/2020'), rendu: false},
    {id: 336, nom: 'Solarbreeze', dateDeRendu: new Date('7/3/2020'), rendu: false},
    {id: 337, nom: 'Rank', dateDeRendu: new Date('12/8/2020'), rendu: true},
    {id: 338, nom: 'Ronstring', dateDeRendu: new Date('3/14/2020'), rendu: false},
    {id: 339, nom: 'Stim', dateDeRendu: new Date('11/5/2020'), rendu: false},
    {id: 340, nom: 'Latlux', dateDeRendu: new Date('2/28/2021'), rendu: true},
    {id: 341, nom: 'It', dateDeRendu: new Date('12/27/2020'), rendu: false},
    {id: 342, nom: 'Bitchip', dateDeRendu: new Date('9/22/2020'), rendu: false},
    {id: 343, nom: 'Aerified', dateDeRendu: new Date('12/8/2020'), rendu: true},
    {id: 344, nom: 'Latlux', dateDeRendu: new Date('9/10/2020'), rendu: true},
    {id: 345, nom: 'Toughjoyfax', dateDeRendu: new Date('11/18/2020'), rendu: true},
    {id: 346, nom: 'Domainer', dateDeRendu: new Date('1/27/2021'), rendu: true},
    {id: 347, nom: 'Y-find', dateDeRendu: new Date('12/26/2020'), rendu: false},
    {id: 348, nom: 'Tin', dateDeRendu: new Date('7/24/2020'), rendu: true},
    {id: 349, nom: 'Y-Solowarm', dateDeRendu: new Date('4/9/2020'), rendu: true},
    {id: 350, nom: 'Sub-Ex', dateDeRendu: new Date('5/20/2020'), rendu: true},
    {id: 351, nom: 'Zaam-Dox', dateDeRendu: new Date('5/13/2020'), rendu: true},
    {id: 352, nom: 'Konklab', dateDeRendu: new Date('11/11/2020'), rendu: false},
    {id: 353, nom: 'Stringtough', dateDeRendu: new Date('1/6/2021'), rendu: false},
    {id: 354, nom: 'Stronghold', dateDeRendu: new Date('7/13/2020'), rendu: true},
    {id: 355, nom: 'Bigtax', dateDeRendu: new Date('5/14/2020'), rendu: true},
    {id: 356, nom: 'Stronghold', dateDeRendu: new Date('10/8/2020'), rendu: true},
    {id: 357, nom: 'Stim', dateDeRendu: new Date('11/30/2020'), rendu: false},
    {id: 358, nom: 'Duobam', dateDeRendu: new Date('7/7/2020'), rendu: true},
    {id: 359, nom: 'Zaam-Dox', dateDeRendu: new Date('4/17/2020'), rendu: true},
    {id: 360, nom: 'Sonsing', dateDeRendu: new Date('4/7/2020'), rendu: true},
    {id: 361, nom: 'Stim', dateDeRendu: new Date('9/5/2020'), rendu: false},
    {id: 362, nom: 'Transcof', dateDeRendu: new Date('2/25/2021'), rendu: true},
    {id: 363, nom: 'Treeflex', dateDeRendu: new Date('12/13/2020'), rendu: false},
    {id: 364, nom: 'Toughjoyfax', dateDeRendu: new Date('1/15/2021'), rendu: false},
    {id: 365, nom: 'Alpha', dateDeRendu: new Date('5/28/2020'), rendu: true},
    {id: 366, nom: 'Treeflex', dateDeRendu: new Date('6/27/2020'), rendu: true},
    {id: 367, nom: 'Temp', dateDeRendu: new Date('10/20/2020'), rendu: true},
    {id: 368, nom: 'Vagram', dateDeRendu: new Date('9/27/2020'), rendu: true},
    {id: 369, nom: 'Pannier', dateDeRendu: new Date('1/20/2021'), rendu: true},
    {id: 370, nom: 'Matsoft', dateDeRendu: new Date('2/21/2021'), rendu: true},
    {id: 371, nom: 'Biodex', dateDeRendu: new Date('11/25/2020'), rendu: false},
    {id: 372, nom: 'Toughjoyfax', dateDeRendu: new Date('12/26/2020'), rendu: false},
    {id: 373, nom: 'It', dateDeRendu: new Date('6/14/2020'), rendu: true},
    {id: 374, nom: 'Veribet', dateDeRendu: new Date('10/9/2020'), rendu: true},
    {id: 375, nom: 'Tres-Zap', dateDeRendu: new Date('1/24/2021'), rendu: true},
    {id: 376, nom: 'Ventosanzap', dateDeRendu: new Date('9/6/2020'), rendu: false},
    {id: 377, nom: 'Bitchip', dateDeRendu: new Date('10/31/2020'), rendu: true},
    {id: 378, nom: 'Andalax', dateDeRendu: new Date('11/20/2020'), rendu: false},
    {id: 379, nom: 'Gembucket', dateDeRendu: new Date('9/5/2020'), rendu: false},
    {id: 380, nom: 'Gembucket', dateDeRendu: new Date('3/11/2020'), rendu: false},
    {id: 381, nom: 'Subin', dateDeRendu: new Date('9/13/2020'), rendu: true},
    {id: 382, nom: 'Aerified', dateDeRendu: new Date('6/6/2020'), rendu: false},
    {id: 383, nom: 'Rank', dateDeRendu: new Date('7/9/2020'), rendu: true},
    {id: 384, nom: 'Vagram', dateDeRendu: new Date('9/21/2020'), rendu: true},
    {id: 385, nom: 'Home Ing', dateDeRendu: new Date('8/3/2020'), rendu: false},
    {id: 386, nom: 'Daltfresh', dateDeRendu: new Date('11/1/2020'), rendu: true},
    {id: 387, nom: 'Trippledex', dateDeRendu: new Date('9/7/2020'), rendu: false},
    {id: 388, nom: 'Stronghold', dateDeRendu: new Date('3/6/2021'), rendu: false},
    {id: 389, nom: 'Matsoft', dateDeRendu: new Date('4/4/2020'), rendu: true},
    {id: 390, nom: 'Flowdesk', dateDeRendu: new Date('6/1/2020'), rendu: true},
    {id: 391, nom: 'Flexidy', dateDeRendu: new Date('1/20/2021'), rendu: true},
    {id: 392, nom: 'Treeflex', dateDeRendu: new Date('10/2/2020'), rendu: true},
    {id: 393, nom: 'Bitwolf', dateDeRendu: new Date('5/24/2020'), rendu: true},
    {id: 394, nom: 'Cardify', dateDeRendu: new Date('3/20/2020'), rendu: true},
    {id: 395, nom: 'Subin', dateDeRendu: new Date('12/22/2020'), rendu: true},
    {id: 396, nom: 'Alpha', dateDeRendu: new Date('4/8/2020'), rendu: true},
    {id: 397, nom: 'Tin', dateDeRendu: new Date('1/9/2021'), rendu: true},
    {id: 398, nom: 'Biodex', dateDeRendu: new Date('8/10/2020'), rendu: false},
    {id: 399, nom: 'Wrapsafe', dateDeRendu: new Date('9/17/2020'), rendu: true},
    {id: 400, nom: 'Bitchip', dateDeRendu: new Date('7/3/2020'), rendu: false},
    {id: 401, nom: 'Veribet', dateDeRendu: new Date('3/21/2020'), rendu: true},
    {id: 402, nom: 'Flexidy', dateDeRendu: new Date('5/7/2020'), rendu: true},
    {id: 403, nom: 'Alpha', dateDeRendu: new Date('5/28/2020'), rendu: false},
    {id: 404, nom: 'Duobam', dateDeRendu: new Date('9/16/2020'), rendu: true},
    {id: 405, nom: 'Wrapsafe', dateDeRendu: new Date('9/20/2020'), rendu: true},
    {id: 406, nom: 'Asoka', dateDeRendu: new Date('3/30/2020'), rendu: true},
    {id: 407, nom: 'Zamit', dateDeRendu: new Date('6/6/2020'), rendu: true},
    {id: 408, nom: 'Stringtough', dateDeRendu: new Date('8/21/2020'), rendu: false},
    {id: 409, nom: 'Sonsing', dateDeRendu: new Date('12/5/2020'), rendu: true},
    {id: 410, nom: 'Domainer', dateDeRendu: new Date('2/22/2021'), rendu: true},
    {id: 411, nom: 'Keylex', dateDeRendu: new Date('9/4/2020'), rendu: false},
    {id: 412, nom: 'Alpha', dateDeRendu: new Date('9/15/2020'), rendu: true},
    {id: 413, nom: 'Zathin', dateDeRendu: new Date('10/16/2020'), rendu: false},
    {id: 414, nom: 'Fix San', dateDeRendu: new Date('4/23/2020'), rendu: true},
    {id: 415, nom: 'Bitwolf', dateDeRendu: new Date('3/9/2021'), rendu: true},
    {id: 416, nom: 'Tempsoft', dateDeRendu: new Date('11/12/2020'), rendu: false},
    {id: 417, nom: 'Zontrax', dateDeRendu: new Date('12/21/2020'), rendu: false},
    {id: 418, nom: 'Duobam', dateDeRendu: new Date('9/1/2020'), rendu: false},
    {id: 419, nom: 'Wrapsafe', dateDeRendu: new Date('3/3/2021'), rendu: false},
    {id: 420, nom: 'Holdlamis', dateDeRendu: new Date('4/6/2020'), rendu: false},
    {id: 421, nom: 'Stim', dateDeRendu: new Date('6/18/2020'), rendu: true},
    {id: 422, nom: 'Cardguard', dateDeRendu: new Date('10/14/2020'), rendu: true},
    {id: 423, nom: 'Voltsillam', dateDeRendu: new Date('6/11/2020'), rendu: true},
    {id: 424, nom: 'Bigtax', dateDeRendu: new Date('6/4/2020'), rendu: true},
    {id: 425, nom: 'Latlux', dateDeRendu: new Date('2/17/2021'), rendu: false},
    {id: 426, nom: 'Opela', dateDeRendu: new Date('10/15/2020'), rendu: false},
    {id: 427, nom: 'Transcof', dateDeRendu: new Date('6/5/2020'), rendu: true},
    {id: 428, nom: 'Quo Lux', dateDeRendu: new Date('12/11/2020'), rendu: true},
    {id: 429, nom: 'Fix San', dateDeRendu: new Date('1/26/2021'), rendu: false},
    {id: 430, nom: 'Sonsing', dateDeRendu: new Date('3/16/2020'), rendu: false},
    {id: 431, nom: 'Greenlam', dateDeRendu: new Date('3/20/2020'), rendu: false},
    {id: 432, nom: 'Otcom', dateDeRendu: new Date('10/9/2020'), rendu: false},
    {id: 433, nom: 'Cardguard', dateDeRendu: new Date('7/18/2020'), rendu: false},
    {id: 434, nom: 'Solarbreeze', dateDeRendu: new Date('11/23/2020'), rendu: true},
    {id: 435, nom: 'Matsoft', dateDeRendu: new Date('8/24/2020'), rendu: false},
    {id: 436, nom: 'Bitwolf', dateDeRendu: new Date('1/30/2021'), rendu: false},
    {id: 437, nom: 'Fixflex', dateDeRendu: new Date('5/16/2020'), rendu: true},
    {id: 438, nom: 'Tempsoft', dateDeRendu: new Date('6/15/2020'), rendu: false},
    {id: 439, nom: 'Zontrax', dateDeRendu: new Date('12/22/2020'), rendu: true},
    {id: 440, nom: 'Tampflex', dateDeRendu: new Date('3/6/2021'), rendu: false},
    {id: 441, nom: 'Alphazap', dateDeRendu: new Date('7/5/2020'), rendu: true},
    {id: 442, nom: 'Flexidy', dateDeRendu: new Date('3/27/2020'), rendu: false},
    {id: 443, nom: 'Domainer', dateDeRendu: new Date('7/27/2020'), rendu: false},
    {id: 444, nom: 'Latlux', dateDeRendu: new Date('8/15/2020'), rendu: true},
    {id: 445, nom: 'Mat Lam Tam', dateDeRendu: new Date('10/5/2020'), rendu: false},
    {id: 446, nom: 'Solarbreeze', dateDeRendu: new Date('4/16/2020'), rendu: true},
    {id: 447, nom: 'Sonair', dateDeRendu: new Date('9/7/2020'), rendu: true},
    {id: 448, nom: 'Sonair', dateDeRendu: new Date('8/29/2020'), rendu: true},
    {id: 449, nom: 'Job', dateDeRendu: new Date('4/7/2020'), rendu: true},
    {id: 450, nom: 'Quo Lux', dateDeRendu: new Date('7/1/2020'), rendu: false},
    {id: 451, nom: 'Greenlam', dateDeRendu: new Date('8/24/2020'), rendu: true},
    {id: 452, nom: 'Prodder', dateDeRendu: new Date('12/21/2020'), rendu: true},
    {id: 453, nom: 'Subin', dateDeRendu: new Date('7/6/2020'), rendu: false},
    {id: 454, nom: 'Job', dateDeRendu: new Date('9/4/2020'), rendu: false},
    {id: 455, nom: 'Bitchip', dateDeRendu: new Date('2/19/2021'), rendu: false},
    {id: 456, nom: 'Biodex', dateDeRendu: new Date('12/3/2020'), rendu: false},
    {id: 457, nom: 'Solarbreeze', dateDeRendu: new Date('9/2/2020'), rendu: true},
    {id: 458, nom: 'Bigtax', dateDeRendu: new Date('5/12/2020'), rendu: false},
    {id: 459, nom: 'Fintone', dateDeRendu: new Date('6/3/2020'), rendu: false},
    {id: 460, nom: 'Kanlam', dateDeRendu: new Date('9/17/2020'), rendu: true},
    {id: 461, nom: 'Domainer', dateDeRendu: new Date('6/15/2020'), rendu: false},
    {id: 462, nom: 'Cookley', dateDeRendu: new Date('12/25/2020'), rendu: false},
    {id: 463, nom: 'Wrapsafe', dateDeRendu: new Date('10/11/2020'), rendu: true},
    {id: 464, nom: 'Konklab', dateDeRendu: new Date('2/4/2021'), rendu: false},
    {id: 465, nom: 'Voltsillam', dateDeRendu: new Date('7/22/2020'), rendu: true},
    {id: 466, nom: 'Y-find', dateDeRendu: new Date('9/2/2020'), rendu: true},
    {id: 467, nom: 'Sonair', dateDeRendu: new Date('4/5/2020'), rendu: false},
    {id: 468, nom: 'Temp', dateDeRendu: new Date('2/14/2021'), rendu: true},
    {id: 469, nom: 'Lotstring', dateDeRendu: new Date('6/28/2020'), rendu: false},
    {id: 470, nom: 'Bitchip', dateDeRendu: new Date('9/4/2020'), rendu: false},
    {id: 471, nom: 'Alphazap', dateDeRendu: new Date('5/29/2020'), rendu: true},
    {id: 472, nom: 'Zamit', dateDeRendu: new Date('3/23/2020'), rendu: true},
    {id: 473, nom: 'Flowdesk', dateDeRendu: new Date('8/19/2020'), rendu: false},
    {id: 474, nom: 'Lotstring', dateDeRendu: new Date('3/5/2021'), rendu: false},
    {id: 475, nom: 'Tampflex', dateDeRendu: new Date('10/21/2020'), rendu: false},
    {id: 476, nom: 'Zathin', dateDeRendu: new Date('12/20/2020'), rendu: false},
    {id: 477, nom: 'Zaam-Dox', dateDeRendu: new Date('5/23/2020'), rendu: false},
    {id: 478, nom: 'Stim', dateDeRendu: new Date('5/30/2020'), rendu: false},
    {id: 479, nom: 'Bitwolf', dateDeRendu: new Date('12/13/2020'), rendu: false},
    {id: 480, nom: 'Zamit', dateDeRendu: new Date('10/1/2020'), rendu: true},
    {id: 481, nom: 'Zoolab', dateDeRendu: new Date('8/24/2020'), rendu: false},
    {id: 482, nom: 'Bigtax', dateDeRendu: new Date('10/3/2020'), rendu: true},
    {id: 483, nom: 'Holdlamis', dateDeRendu: new Date('3/12/2020'), rendu: false},
    {id: 484, nom: 'Hatity', dateDeRendu: new Date('12/28/2020'), rendu: true},
    {id: 485, nom: 'Prodder', dateDeRendu: new Date('12/17/2020'), rendu: false},
    {id: 486, nom: 'Y-find', dateDeRendu: new Date('6/26/2020'), rendu: false},
    {id: 487, nom: 'Flowdesk', dateDeRendu: new Date('7/5/2020'), rendu: false},
    {id: 488, nom: 'Redhold', dateDeRendu: new Date('7/4/2020'), rendu: false},
    {id: 489, nom: 'Zontrax', dateDeRendu: new Date('8/14/2020'), rendu: true},
    {id: 490, nom: 'Tresom', dateDeRendu: new Date('7/9/2020'), rendu: false},
    {id: 491, nom: 'Trippledex', dateDeRendu: new Date('7/2/2020'), rendu: true},
    {id: 492, nom: 'Fixflex', dateDeRendu: new Date('10/6/2020'), rendu: false},
    {id: 493, nom: 'Voyatouch', dateDeRendu: new Date('8/20/2020'), rendu: true},
    {id: 494, nom: 'Trippledex', dateDeRendu: new Date('10/16/2020'), rendu: true},
    {id: 495, nom: 'Treeflex', dateDeRendu: new Date('9/27/2020'), rendu: true},
    {id: 496, nom: 'Domainer', dateDeRendu: new Date('7/24/2020'), rendu: false},
    {id: 497, nom: 'Sonsing', dateDeRendu: new Date('8/6/2020'), rendu: true},
    {id: 498, nom: 'Flowdesk', dateDeRendu: new Date('12/30/2020'), rendu: false},
    {id: 499, nom: 'Fintone', dateDeRendu: new Date('11/10/2020'), rendu: false},
    {id: 500, nom: 'Rank', dateDeRendu: new Date('7/1/2020'), rendu: true}];

  dataImport: any = (bdInitialAssignments as any).default;

  constructor(private loggingService: LoggingService, private http: HttpClient) { }

  // uri = 'http://localhost:8010/api/assignments';
  uri = 'https://backend-assignment-mbds-mean.herokuapp.com/api/assignments';


  getAssignments(): Observable<Assignment[]> {
    console.log('Dans le service de gestion des assignments...');
    // return of(this.assignments);
    return this.http.get<Assignment[]>(this.uri);
  }

  getAssignmentsPagine(page: number, limit: number): Observable<any> {
    console.log('Dans le service de gestion des assignments...');
    return this.http.get<any>(this.uri + '?page=' + page + '&limit=' + limit);
  }

  // Pour votre culture, on peut aussi utiliser httpClient avec une promesse
  // et then, async, await etc. Mais ce n'est pas la norme chez les developpeurs
  // Angular
  getAssignmentsAsPromise(): Promise<Assignment[]> {
    console.log('Dans le service de gestion des assignments...');
    // return of(this.assignments);
    return this.http.get<Assignment[]>(this.uri).toPromise();
  }

  getAssignment(id: number): Observable<Assignment> {
    // let assignementCherche = this.assignments.find(a => a.id === id);

    // return of(assignementCherche);

    return this.http.get<Assignment>(this.uri + '/' + id)
    .pipe(
      // traitement 1
      map(a => {
        a.nom += ' MODIFIE PAR MAP';
        return a;
      }),
      tap(a => {
        console.log('TRACE DANS TAP : j\'ai reçu ' + a.nom);
      }),
      /*
      filter(a => {
        return (a.rendu)
      })
      */
      catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
    );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }

  generateId(): number {
    return Math.round(Math.random() * 100000);
  }

  addAssignment(assignment: Assignment): Observable<any> {
    assignment.id = this.generateId();
    this.loggingService.log(assignment.nom, ' a été ajouté');

    /*this.assignments.push(assignment);


    return of("Service: assignment ajouté !");*/

    return this.http.post(this.uri, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    // besoin de ne rien faire puisque l'assignment passé en paramètre
    // est déjà un élément du tableau

    // let index = this.assignments.indexOf(assignment);

    // console.log("updateAssignment l'assignment passé en param est à la position " + index + " du tableau");
    this.loggingService.log(assignment.nom, ' a été modifié');

    return this.http.put(this.uri, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    /*
    let index = this.assignments.indexOf(assignment);

    this.assignments.splice(index, 1);
    */


    this.loggingService.log(assignment.nom, ' a été supprimé');

    return this.http.delete(this.uri + '/' + assignment._id);

  }

  populate(): Observable<any> {
    const calls = [];
    this.data.forEach(a => calls.push(this.addAssignment(a)));
    return forkJoin(calls);
  }

  populate2(): void {
    this.dataImport.forEach(a => this.addAssignment(a).subscribe(ret => console.log(ret)));
  }
}
