Feature: Security
  As a software engineer
  I must assume that everything is malicious
  Until proven safe to use

Scenario Outline: XSS via href attribute and JavaScript URLs
  Given I have this untrusted data
    """
    <untrusted_data>
    """
  And my code injects this HTML into the application
    """
    <a id="dodgy" href="<untrusted_data>">click here</a>
    """
  When the user clicks the dodgy link
  Then they will see the message "XSS!"
  When I scan the untrusted data for potential threats
  Then I will see that it was dodgy

  Examples:
    | untrusted_data           |
    | javascript:alert('XSS!') |
    | JAVAscriPT:alert('XSS!') |