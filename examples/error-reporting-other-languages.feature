# language: fr
Fonctionnalité: reporting in other languages

    Showcase how keywords are handled when working in another language than English

    Contexte:
        Soit I opened a search page

    Scénario: Report in other language
        # Given I defined my test in another language
        Etant donné que j'ai défini mon test dans un autre language
        # When my test fails
        Quand mon test échoue
        # Then the steps are displayed in the report in the corresponding language
        Alors les étapes s'affichent dans le rapport dans la langue choisie