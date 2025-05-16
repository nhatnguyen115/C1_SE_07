INSERT INTO role(role_type, description)
VALUES ('ADMIN', 'ALL PERMISSION'),
       ('USER', 'CUSTOM PERMISSION');

INSERT INTO module(module_id, module_name)
VALUES (100100, 'Practice L&R'),
    (100101, 'Practice S&W'),
    (100103, 'Vocabulary'),
    (100104, 'Grammar');

INSERT INTO section(section_id, module_id, section_type, section_name, description, order_number)
VALUES (100200, 100100, 'LISTENING', 'Section 1: Photographs', 'Four short statements regarding a photograph will be spoken only one time. Of these four statements, select the one. that best describes the photograph.', 1),
    (100201, 100100, 'LISTENING', 'Section 2: Question-Response', 'Three responses to one question or statement will be spoken only one time. Select the best response for the question.', 2),
    (100202, 100100, 'LISTENING', 'Section 3: Short Conversations', 'Conversations between two or three people will be spoken only one time. Listen to each conversation and select the best response for the question. There are three questions for each conversation.', 3),
    (100203, 100100, 'LISTENING', 'Section 4: Short Talks', 'Short talks such as announcements or narrations will be spoken only one time. Listen to each talk and select the best response for the question There are three questions for each talk.', 4),
    (100250, 100100, 'READING', 'Section 5: Incomplete Sentences', 'Select the best answer of the four choices to complete the sentence.', 5),
    (100251, 100100, 'READING', 'Section 6: Text Completion', 'Select the best answer of the four choices (words, phrases, or a sentence) to complete the text. There are four questions for each text.', 6),
    (100252, 100100, 'READING', 'Section 7: Reading Comprehension', 'Read a range of different texts and select the best answer of the four choices. There are multiple questions for each text.', 7),
    (100300, 100101, 'SPEAKING', 'Section 1: Read Aloud', 'In this section of the test, you will read aloud the text on the screen. You will have 45 seconds to prepare. Then you will have 45 seconds to read the text aloud.', 1),
    (100301, 100101, 'SPEAKING', 'Section 2: Describe a Picture', 'In this section, you will describe the picture on your screen in as much detail as you can. You will have 45 seconds to prepare your response and 30 seconds to speak about the picture.', 2),
    (100302, 100101, 'SPEAKING', 'Section 3: Respond to Questions', 'In this section, you will answer three questions. You will have three seconds to prepare after you hear each question, 15 seconds to respond to Q1 and 2, and 30 seconds to respond to Q3.', 3),
    (100303, 100101, 'SPEAKING', 'Section 4: Respond to questions using information provided', 'In this section, you will answer three questions based on information provided. You will have 45s to read information before questions begin. You will have 3s to prepare and 15s to respond to Q1 and 2. You will hear Q3 two times and have 3s to prepare and 30s to respond to Q3.', 4),
    (100304, 100101, 'SPEAKING', 'Section 5: Express an opinion', 'In this section, you will give your opinion about a specific topic. Be sure to say as much as you can in the time allowed. You will have 45 seconds to prepare. Then you will have 60 seconds to speak.', 5),
    (100350, 100101, 'READING', 'Section 6: Write a sentence based on a picture', 'In this section, you will write ONE sentence that is based on a picture. With each picture, you will be given TWO words or phrases that you must use in your sentence. You can change the forms of words and use the words in any order.', 6),
    (100351, 100101, 'READING', 'Section 7: Respond to a written request', 'In this section, you will show how well you can write a response to an e-mail.', 7),
    (100352, 100101, 'READING', 'Section 8: Write an opinion essay', 'In this section, you will write an essay in response to a question that asks you to state, explain, and support your opinion on an issue. Typically, an effective essay will contain a minimum of 300 words.', 8);

INSERT INTO test(test_id, test_type, description)
VALUES (100201, 'Simulation Test', 'Computer-based simulation test with the format and testing interface as the actual test will help you carefully prepare for your test day.'),
    (100202, 'MINI TEST', 'Take mini test with the number of questions and time limit reduced by half'),
    (100203, 'FULL TEST', 'Take full test with the same number of questions and time limit as the actual test');

DELETE FROM menu WHERE true;
INSERT INTO menu(menu_id, label, url, parent_id, order_number, status, item_id, icon)
VALUES (0, null, '/', -1, 0, true, null, ''),

       (200100, 'Practice L&R', '/sections?moduleId={id}', 0, 1, true, 100100, ''),
       (200101, 'Practice S&W', '/sections?moduleId={id}', 0, 2, true, 100101, ''),
       (200102, 'Test', '/tests', 0, 3, true, 100102, ''),
       (200103, 'Vocabulary', '/sections?moduleId={id}', 0, 4, true, 100103, ''),
       (200104, 'Grammar', '/sections?moduleId={id}', 0, 5, true, 100104, ''),

       (300100, 'Section 1: Photographs', '/sections/{id}', 200100, 1, true, 100200, ''),
       (300101, 'Section 2: Question-Response', '/sections/{id}', 200100, 2, true, 100201, ''),
       (300102, 'Section 3: Short Conversations', '/sections/{id}', 200100, 3, true, 100202, ''),
       (300103, 'Section 4: Short Talks', '/sections/{id}', 200100, 4, true, 100203, ''),
       (300150, 'Section 5: Incomplete Sentences', '/sections/{id}', 200100, 5, true, 100250, ''),
       (300151, 'Section 6: Text Completion', '/sections/{id}', 200100, 6, true, 100251, ''),
       (300152, 'Section 7: Reading Comprehension', '/sections/{id}', 200100, 7, true, 100252, ''),

       (300200, 'Section 1: Read Aloud', '/sections/{id}', 200101, 1, true, 100300, ''),
       (300201, 'Section 2: Describe a Picture', '/sections/{id}', 200101, 2, true, 100301, ''),
       (300202, 'Section 3: Respond to Questions', '/sections/{id}', 200101, 3, true, 100302, ''),
       (300203, 'Section 4: Respond to questions using information provided', '/sections/{id}', 200101, 4, true, 100303, ''),
       (300204, 'Section 5: Express an opinion', '/sections/{id}', 200101, 5, true, 100304, ''),
       (300250, 'Section 6: Write a sentence based on a picture', '/sections/{id}', 200101, 6, true, 100350, ''),
       (300251, 'Section 7: Respond to a written request', '/sections/{id}', 200101, 7, true, 100351, ''),
       (300252, 'Section 8: Write an opinion essay', '/sections/{id}', 200101, 8, true, 100352, ''),

       (300300, 'Simulation Test', '/exams?testId={id}', 200102, 1, true, 100201, ''),
       (300301, 'MINI TEST', '/exams?testId={id}', 200102, 2, true, 100202, ''),
       (300302, 'FULL TEST', '/exams?testId={id}', 200102, 3, true, 100203, '');

INSERT INTO public.menu (menu_id,"label",url,parent_id,order_number,description,status) VALUES
	 (300303,'Trang Chủ','/',0,0,NULL,true);

INSERT INTO public.menu (menu_id,"label",url,parent_id,order_number,description,status) VALUES
 (300304,'Premium','/payment',0,6,NULL,true);
