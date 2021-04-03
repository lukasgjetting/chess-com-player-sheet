import Chart, { ChartElementsOptions } from 'chart.js';

interface ChartCenterOptions {
	text?: string;
	textColor?: string;
}

interface CustomChartElementsOptions extends ChartElementsOptions {
	center: ChartCenterOptions;
}

Chart.pluginService.register({
	beforeDraw(chart) {
		const {
			width,
			height,
			ctx,
			config,
		} = chart;

		if (
			ctx == null ||
            height == null ||
            width == null ||
            config.options?.elements == null
		) {
			return;
		}

		const elements = config.options?.elements as CustomChartElementsOptions;

		if (elements.center?.text == null) {
			return;
		}

		ctx.restore();

		const fontSize = (height / 114).toFixed(2);
		ctx.font = `${fontSize}em sans-serif`;
		ctx.textBaseline = 'middle';

		const { text, textColor } = elements.center;

		const textX = Math.round((width - ctx.measureText(text).width) / 2);
		const textY = height / 2;

		ctx.fillStyle = textColor || '#000';
		ctx.fillText(text, textX, textY);
		ctx.save();
	},
});
