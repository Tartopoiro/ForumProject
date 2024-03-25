import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-404',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './404.component.html',
  styleUrl: './404.component.css'
})
export class ErrorComponent {
  // Définition des propriétés d'entrée (inputs) du composant avec des valeurs par défaut
  @Input() msg = 'Désolé, nous n’avons pas trouvé cette page.'; // Message d'erreur par défaut
  @Input() msg2 = 'Mais ne vous inquiétez pas, vous pouvez trouver beaucoup d’autres choses sur notre page d’accueil.'; // Deuxième message par défaut

  @Input() margin: string = 'oui'; // Propriété d'entrée pour définir la marge, par défaut 'oui'
}
