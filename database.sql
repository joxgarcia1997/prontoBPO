CREATE DATABASE ng_prueba;

USE ng_prueba;

CREATE TABLE `meetings` (
  `meeting_id` int(11) NOT NULL,
  `meeting_time` time NOT NULL,
  `free_time` time DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
)
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` varchar(180) DEFAULT NULL
)

ALTER TABLE `meetings`
  ADD PRIMARY KEY (`meeting_id`),
  ADD KEY `user_id` (`user_id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

ALTER TABLE `meetings`
  MODIFY `meeting_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
