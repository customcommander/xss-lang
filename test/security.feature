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
    | untrusted_data                                                             |
    | javascript:alert('XSS!')                                                   |
    | JAVAscriPT:alert('XSS!')                                                   |
    | &#x6a;&#x61;&#x76;&#x61;&#x73;&#x63;&#x72;&#x69;&#x70;&#x74;:alert('XSS!') |
    | &#X6A;&#X61;&#X76;&#X61;&#X73;&#X63;&#X72;&#X69;&#X70;&#X74;:alert('XSS!') |
    | &#X6A&#X61&#X76&#X61&#X73&#X63&#X72&#X69&#X70&#X74:alert('XSS!')           |
    | &#x6A;&#X61&#x76;&#X61&#X73;&#X63&#X72&#x69;&#X70&#x74:alert('XSS!')       |
    | j&#13;a&#13;v&#13;a&#13;s&#13;c&#13;r&#13;i&#13;p&#13;t:alert('XSS!')      |
    | j&#13a&#13v&#13a&#13s&#13c&#13r&#13i&#13p&#13t&#13;:alert('XSS!')          |
    | java&#09;script:alert('XSS!')                                              |
    | java&#09script:alert('XSS!')                                               |
    | java&#0000000000009script:alert('XSS!')                                    |
    | ja&#09;va&#0000000000009sc&#09ript:alert('XSS!')                           |