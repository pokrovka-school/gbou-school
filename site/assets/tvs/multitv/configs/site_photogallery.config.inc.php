<?php
$settings['display'] = 'vertical';
$settings['fields'] = array(
	'title' => array(
		'caption' => 'Заголовок',
		'type' => 'text'
	),
	'image' => array(
		'caption' => 'Изображение',
		'type' => 'image'
	),
	'thumb' => array(
		'caption' => 'Перевьюшка',
		'type' => 'thumb',
		'thumbof' => 'image'
	)
);
$settings['templates'] = array(
	'outerTpl' => '<div class="slick-home"><div id="slick" class="slick">[+wrapper+]</div></div>',
	'rowTpl' => '
	<div class="slick-item">
		<img src="[[phpthumb? &input=`[+image+]` &options=`w=1395,h=450,zc=C`]]" alt="[+title:ifempty=`[*pagetitle:hsc*]`+]">
	</div>'
);
$settings['configuration'] = array(
	'enablePaste' => true,
	'csvseparator' => ';'
);