<?php
$settings['display'] = 'vertical';
$settings['fields'] = array(
	"url" => array(
		'caption' => 'Ссылка',
		'type' => 'text'
	),
	'title' => array(
		'caption' => 'Описание',
		'type' => 'textarea'
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
	'outerTpl' => '<div class="row"><aside class="clearfix sites">[+wrapper+]</aside></div>',
	'rowTpl' => '<div class="sites-link"><a href="[+url+]" title="[[strHsc? &input=`[+title+]`]]" target="_blank"><img src="[[phpthumb? &input=`[+image+]` &options=`w=200,h=90,zc=C`]]" alt="[[strHsc? &input=`[+title+]`]]"></a></div>'
);
$settings['configuration'] = array(
	'enablePaste' => true,
	'csvseparator' => ';'
);