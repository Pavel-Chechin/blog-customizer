import { useState, FormEvent, useEffect, useRef } from 'react';
import clsx from 'clsx';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';

export type FormProps = {
	onSubmit: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onSubmit }: FormProps) => {
	const [isPanelOpen, setIsPanelOpen] = useState(false);
	const [articleSettings, setArticleSettings] =
		useState<ArticleStateType>(defaultArticleState);
	const panelRef = useRef<HTMLDivElement>(null);

	const updateSetting = (
		key: keyof ArticleStateType,
		value: ArticleStateType[keyof ArticleStateType]
	) => {
		setArticleSettings((prev) => ({ ...prev, [key]: value }));
	};

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();
		onSubmit(articleSettings);
	};

	const resetSettings = () => {
		setArticleSettings(defaultArticleState);
	};

	const handleOutsideClick = (event: MouseEvent) => {
		if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
			setIsPanelOpen(false);
		}
	};

	useEffect(() => {
		if (isPanelOpen) {
			document.addEventListener('mousedown', handleOutsideClick);
		}
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isPanelOpen]);

	return (
		<>
			<ArrowButton
				isOpen={isPanelOpen}
				onClick={() => setIsPanelOpen((prev) => !prev)}
			/>
			<aside
				ref={panelRef}
				className={clsx(styles.container, {
					[styles.container_open]: isPanelOpen,
				})}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={articleSettings.fontFamilyOption}
						onChange={(value) => updateSetting('fontFamilyOption', value)}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={articleSettings.fontSizeOption}
						name='fontSize'
						onChange={(value) => updateSetting('fontSizeOption', value)}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={articleSettings.fontColor}
						onChange={(value) => updateSetting('fontColor', value)}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={articleSettings.backgroundColor}
						onChange={(value) => updateSetting('backgroundColor', value)}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={articleSettings.contentWidth}
						onChange={(value) => updateSetting('contentWidth', value)}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={resetSettings}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
