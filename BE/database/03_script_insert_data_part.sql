INSERT INTO public.part (part_id,part_name,description,question_type,instructions,media_id,question_count,order_number) VALUES
(51,'Part 1','Part 1','MULTIPLE_CHOICE'::public.question_type,NULL,NULL,10,1),
(101,'Part 2','Part 2','MULTIPLE_CHOICE'::public.question_type,NULL,NULL,10,2),
(151,'Part 3','Part 3','MULTIPLE_CHOICE'::public.question_type,NULL,NULL,10,3),
(201,'Part 4','Part 4','MULTIPLE_CHOICE'::public.question_type,NULL,NULL,10,4),
(251,'Part 5','Part 5','MULTIPLE_CHOICE'::public.question_type,NULL,NULL,10,5);


INSERT INTO public.part (part_id,part_name,description,question_type,instructions,media_id,question_count,order_number) VALUES
(301,'Part 6','Part 6','MULTIPLE_CHOICE'::public.question_type,NULL,NULL,30,6),
(351,'Part 7','Part 7','MULTIPLE_CHOICE'::public.question_type,NULL,NULL,30,7),
(401,'Part 8','Part 8','MULTIPLE_CHOICE'::public.question_type,NULL,NULL,30,8);

INSERT INTO public.part (part_id,part_name,description,question_type,instructions,media_id,question_count,order_number) VALUES
(451,'Part 9','Part 9','MULTIPLE_CHOICE'::public.question_type,NULL,NULL,39,9),
(501,'Part 10','Part 10','MULTIPLE_CHOICE'::public.question_type,NULL,NULL,39,10),
(551,'Part 11','Part 11','MULTIPLE_CHOICE'::public.question_type,NULL,NULL,39,11);
SELECT setval('part_seq', (SELECT MAX(part_id) FROM part));
SELECT setval('section_seq', (SELECT MAX(section_id) FROM section));
INSERT INTO public.section_part (section_id,part_id) VALUES
                                                         (100200,51),
                                                         (100200,101),
                                                         (100200,151),
                                                         (100200,201),
                                                         (100200,251),
                                                         (100200,601),
                                                         (100200,651),
                                                         (100200,701);
