import { type PanelOptionsEditorBuilder } from '@grafana/data';
import { t } from '@grafana/i18n';
import { TableCellHeight, type TableOptions } from '@grafana/schema';
import { defaultOptions as defaultTableOptions } from '@grafana/schema/dist/esm/raw/composable/table/panelcfg/x/TablePanelCfg_types.gen';

import { PaginationEditor } from './PaginationEditor';

export const addTableCustomPanelOptions = <O extends TableOptions>(builder: PanelOptionsEditorBuilder<O>) => {
  const category = [t('table.category-table', 'Table')];
  builder
    .addBooleanSwitch({
      path: 'showHeader',
      name: t('table.name-show-table-header', 'Show table header'),
      category,
      defaultValue: defaultTableOptions.showHeader,
    })
    .addNumberInput({
      path: 'frozenColumns.left',
      name: t('table.name-frozen-columns', 'Frozen columns'),
      description: t('table.description-frozen-columns', 'Columns are frozen from the left side of the table'),
      settings: {
        placeholder: t('table.placeholder-frozen-columns', 'none'),
      },
      category,
    })
    .addRadio({
      path: 'cellHeight',
      name: t('table.name-cell-height', 'Cell height'),
      category,
      defaultValue: defaultTableOptions.cellHeight,
      settings: {
        options: [
          { value: TableCellHeight.Sm, label: t('table.cell-height-options.label-small', 'Small') },
          { value: TableCellHeight.Md, label: t('table.cell-height-options.label-medium', 'Medium') },
          { value: TableCellHeight.Lg, label: t('table.cell-height-options.label-large', 'Large') },
        ],
      },
    })
    .addNumberInput({
      path: 'maxRowHeight',
      name: t('table.name-max-height', 'Max row height'),
      category,
      settings: {
        placeholder: t('table.placeholder-max-height', 'none'),
        min: 0,
      },
    })
    .addCustomEditor({
      id: 'enablePagination',
      path: 'enablePagination',
      name: t('table.name-enable-pagination', 'Enable pagination'),
      category,
      editor: PaginationEditor,
      defaultValue: defaultTableOptions?.enablePagination,
    })
    .addBooleanSwitch({
      path: 'autoHeight.enabled',
      name: t('table.name-auto-panel-height', 'Auto panel height'),
      description: t(
        'table.description-auto-panel-height',
        'Resize the dashboard panel to fit a bounded number of visible rows when pagination is enabled'
      ),
      category,
      defaultValue: false,
      showIf: (options) => Boolean(options.enablePagination),
    })
    .addNumberInput({
      path: 'autoHeight.minRows',
      name: t('table.name-auto-panel-height-min-rows', 'Minimum visible rows'),
      category,
      defaultValue: 5,
      settings: {
        min: 1,
        integer: true,
      },
      showIf: (options) => Boolean(options.enablePagination && options.autoHeight?.enabled),
    })
    .addNumberInput({
      path: 'autoHeight.maxRows',
      name: t('table.name-auto-panel-height-max-rows', 'Maximum visible rows'),
      category,
      defaultValue: 20,
      settings: {
        min: 1,
        integer: true,
      },
      showIf: (options) => Boolean(options.enablePagination && options.autoHeight?.enabled),
    });
};
