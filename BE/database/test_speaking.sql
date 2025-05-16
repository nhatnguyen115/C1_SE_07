ALTER TABLE question ALTER COLUMN "options" DROP NOT NULL;
INSERT INTO part
(part_id, part_name, description, "question_type", instructions, media_id, question_count, order_number, created_at, created_by, updated_at, updated_by)
VALUES(601, 'Part 12', 'Speaking', 'AUDIO_BASED'::public."question_type", 'In this part of the test, you will read aloud the text on the screen. You will have 45 seconds to prepare. Then you will have 45 seconds to read the text aloud.', NULL, 10, 12, '2025-05-13 22:33:26.642', NULL, NULL, NULL);

INSERT INTO question
(media_id, part_id, "content", "options", correct_answer, explanation, difficulty, order_number, created_at, created_by, updated_at, updated_by)
VALUES(NULL, 601, 'Hi. This is Myra Peters calling about my appointment with Dr. Jones. I have a three o’clock appointment scheduled for this afternoon. Unfortunately, I won’t be able to keep it because of an important meeting at work. So, I’ll need to reschedule. I was hoping to come in sometime next week. Any time Monday, Tuesday, or Wednesday afternoon would work for me. I hope the doctor has some time available on one of those days. Please call me back and let me know.', NULL, 'Hi. This is Myra Peters calling about my appointment with Dr. Jones. I have a three o’clock appointment scheduled for this afternoon. Unfortunately, I won’t be able to keep it because of an important meeting at work. So, I’ll need to reschedule. I was hoping to come in sometime next week. Any time Monday, Tuesday, or Wednesday afternoon would work for me. I hope the doctor has some time available on one of those days. Please call me back and let me know.', NULL, 'BEGINNER'::public."difficulty_level", 1, '2025-05-14 15:34:08.460', NULL, NULL, NULL);

INSERT INTO section_part(section_id, part_id)
VALUES(100300, 601);