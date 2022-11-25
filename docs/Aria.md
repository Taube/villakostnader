# Aria

Accessible Rich Internet Applications (ARIA) is a set of roles and attributes that define ways to make web content and web applications (especially those developed with JavaScript) more accessible to people with disabilities.

## Register

Registration fields has lots of validation for field inputs.
Here it's important to help the user and adding ARIA to help fill out.

## Sign In

- There is no real need to help the user with aria-attributes here.
- It is important though, to make sure values of fields are cleared by setting value of the inputs to the current state, and then clearing those values once form is submitted.

## Password

Note. autoComplete attribute is not supported by type="password". Not need setting it.

## Form/Button

Note: If there is only one button in a form, there is no need to set type="submit" or have a handleEvent for onClick etc.
