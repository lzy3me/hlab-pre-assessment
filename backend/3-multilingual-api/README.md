# Multilingual Product API

## Database Design
Initially I design to use only product table to store all of the data that have multi-language support, But It's work best if you have only 2 languages. So I do some research for multi-language database design best practics and start to design new one.

![db design image](./Multilingual%20Product%20Design.png)

The database design consisting with `product`, `content`, `translation` and `language` tables

`product` table are main data store that will store data that link with key from `content` table. Which have a `contentText` and `languageId` for each product. And then we have a `translation` table which store translation data for each language in `language` table link with `languageId`.

From this design. It can have more than just 2 languages and more flexible if you want to add another language into system.

## Validation
To validate which language input with each languageId is the correct one. I design to use Regular Expression implant in `language` table and then check for each input with correct languageId tag. if languageId not found or input incorrect will reject and rollback current data insert.

## Testing
For testing. This is kinda new to me, Because all of my pass work I didn't have chance to do an proper unit testing. So I used ChatGPT to assisting and do the research for it. But from my latest work they run unit testing within CI/CD pipeline before each deployment to verify code integrity and submit to Tester for verification. If everything good to go we're ready to do integration tests, Which every components from current circle will be run full unit testing and submit to Tester for verify again.