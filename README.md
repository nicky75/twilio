# SFCC Simple Task

1. A form to register for a back in stock notification is displayed on PDP for out-of-stock products. The form consists of:
1.1 A suitable description paragraph that can be edited in BM
1.2 A phone number text field with a label, client- and server-side validation; a valid phone number is defined as any string that only contains digits, spaces, brackets and +
1.3 A submit button that triggers client-side validation and submits the form
1.4 Notification that indicates whether the customer was subscribed successfully after submitting valid data
2. When a valid phone number is submitted, the subscription data (product ID and phone number) is saved in a custom object; consider that duplicates should be avoided, and that there is quota of 400,000 custom object entries total
3. All subscriptions are checked periodically, and all those whose products are back in stock trigger an SMS notification to their recorded phone number, and are deleted

