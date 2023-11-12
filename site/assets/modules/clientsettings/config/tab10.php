<?php
return [
	'caption'  => 'ДАННЫЕ ШКОЛЫ',
	'introtext' => 'Данные школы',
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
		'site_links' => [
			'caption' => 'Сайты',
			'type'  => 'custom_tv:multitv',
		],
	]
];