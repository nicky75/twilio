# SFCC Simple Task

1. A form to register for a back in stock notification is displayed on PDP for out-of-stock products. The form consists of:
- Descrption paragraph that is localized from a content asset
- Phone number text field from a form
- PID hidden field
- Client and server side validation
- Submit button that appears instead of the Add to cart button
- Notification for error or successful addition of the product and phone to a custom object

2. When a valid phone number is submitted, the subscription data (product ID and phone number) is saved in a custom object; duplicates are avoided, and that there is quota of 400,000 custom object entries total

3. All subscriptions are checked periodically, and all those whose products are back in stock trigger an SMS notification to their recorded phone number, and are deleted

