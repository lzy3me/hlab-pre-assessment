# Multilingual Product API

## Database Design
Initially I design to use only product table to store all of the data that have multi-language support, But It's work best if you have only 2 languages. So I do some research for multi-language database design best practics and start to design new one.

![db design image](./Multilingual%20Product%20Design.png)

The database design consisting with `product`, `content`, `translation` and `language` tables

`product` table are main data store that will store data that link with key from `content` table. Which have a `originContentText` and `originLanguageId` for each product. And then we have a `translation` table which store translation data for each language in `language` table link with `languageId`.

From this design. It can have more than just 2 languages and more flexible if you want to add another language into system.

## Validation
TODO: Describe validation!!!

## Testing
TODO: Describe testing!!!