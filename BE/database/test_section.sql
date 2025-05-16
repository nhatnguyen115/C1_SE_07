ALTER TABLE "section" ALTER COLUMN "section_type" DROP NOT NULL;
SELECT setval('section_seq', (SELECT MAX(section_id) FROM "section"));
SELECT setval('question_seq', (SELECT MAX(question_id) FROM question));

INSERT INTO "section"(section_id, module_id, section_name, "section_type", description, order_number, created_at, created_by, updated_at, updated_by)
VALUES(100402, 100104, 'NOUNS', NULL, NULL, 1, '2025-05-14 21:19:23.323', NULL, NULL, NULL);
INSERT INTO "section" (section_id, module_id, section_name, "section_type", description, order_number, created_at, created_by, updated_at, updated_by)
VALUES(100452, 100104, 'ADJECTIVES', NULL, NULL, 2, '2025-05-14 21:20:06.806', NULL, NULL, NULL);
INSERT INTO "section" (section_id, module_id, section_name, "section_type", description, order_number, created_at, created_by, updated_at, updated_by)
VALUES(100502, 100103, 'Contracts', NULL, NULL, 1, '2025-05-14 21:27:47.313', NULL, NULL, NULL);

INSERT INTO section_part (section_id, part_id)
VALUES(100402, 651);
INSERT INTO section_part (section_id, part_id)
VALUES(100502, 701);

INSERT INTO part (part_id, part_name, description, "question_type", instructions, media_id, question_count, order_number, created_at, created_by, updated_at, updated_by)
VALUES(651, 'Part 1', 'Grammar', 'MULTIPLE_CHOICE'::public."question_type", NULL, NULL, 20, 1, '2025-05-14 21:21:39.009', NULL, NULL, NULL);
INSERT INTO part (part_id, part_name, description, "question_type", instructions, media_id, question_count, order_number, created_at, created_by, updated_at, updated_by)
VALUES(701, 'Part 1', 'Vocabulary', 'FILL_IN_BLANK'::public."question_type", NULL, NULL, 12, 1, '2025-05-14 21:41:30.276', NULL, NULL, NULL);

INSERT INTO question(media_id, part_id, "content", "options", correct_answer, explanation, difficulty, order_number, created_at, created_by, updated_at, updated_by)
VALUES(NULL, 651, 'If you have questions regarding your purchase, please provide our staff with the relevant____.', '{"A": "informed", "B": "information", "C": "inform", "D": "informations"}'::jsonb, 'B', NULL, 'INTERMEDIATE'::public."difficulty_level", 1, '2025-05-14 21:26:38.557', NULL, NULL, NULL);
INSERT INTO question(media_id, part_id, "content", "options", correct_answer, explanation, difficulty, order_number, created_at, created_by, updated_at, updated_by)
VALUES(NULL, 701, 'tuân thủ', NULL, 'abide by', NULL, 'BEGINNER'::public."difficulty_level", 1, '2025-05-14 21:43:20.517', NULL, NULL, NULL);

ALTER TYPE section_type ADD VALUE 'GRAMMAR';
ALTER TYPE section_type ADD VALUE 'VOCABULARY';

update "section" 
set section_type = 'GRAMMAR'
where section_id = 100402;

update "section" 
set section_type = 'GRAMMAR'
where section_id = 100452;

update "section" 
set section_type = 'VOCABULARY'
where section_id = 100502;