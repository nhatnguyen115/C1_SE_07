INSERT INTO exam (exam_id, test_id, exam_name, total_score, duration, created_at, created_by, updated_at, updated_by)
VALUES(1, 100201, 'Exam 1', 100, 120, '2025-05-11 20:40:50.630', NULL, NULL, NULL);
INSERT INTO exam (exam_id, test_id, exam_name, total_score, duration, created_at, created_by, updated_at, updated_by)
VALUES(51, 100201, 'Exam 2', 100, 120, '2025-05-15 14:04:07.287', NULL, NULL, NULL);

INSERT INTO exam_structure(exam_id, part_id)
VALUES(1, 51);
INSERT INTO exam_structure(exam_id, part_id)
VALUES(1, 201);
INSERT INTO exam_structure(exam_id, part_id)
VALUES(1, 101);
INSERT INTO exam_structure(exam_id, part_id)
VALUES(1, 151);