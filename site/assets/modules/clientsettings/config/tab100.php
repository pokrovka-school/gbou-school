<?php
return [
	'caption'  => 'SEO',
	'introtext' => 'Настройки для SEO',
	'settings' => [
		'site_description' => [
			'caption' => 'Приветственное сообщение на сайте',
			'type'  => 'text',
			'note'  => '',
			'default_text' => 'Мы рады видеть Вас на официальном сайте государственного бюджетного общеобразовательного учреждения основной общеобразовательной школы с. Покровка муниципального района Кинельский Самарской области',
		],
		'site_photogallery' => [
			'caption' => 'Карусель станицы',
			'type'  => 'custom_tv:multitv',
		],
		'yandex_counter' => [
			'caption' => 'ID Yandex счётчика',
			'type'  => 'text',
			'note'  => '',
			'default_text' => '',
		],
	]
];