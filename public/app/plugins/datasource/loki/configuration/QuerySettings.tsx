import * as React from 'react';

import { ConfigDescriptionLink, ConfigSubSection } from '@grafana/plugin-ui';
import { Alert, InlineField, InlineSwitch, Input } from '@grafana/ui';

type Props = {
  maxLines: string;
  onMaxLinedChange: (value: string) => void;
  enableCrossStreamContext: boolean;
  onCrossStreamContextChange: (value: boolean) => void;
};

export const QuerySettings = (props: Props) => {
  const { maxLines, onMaxLinedChange, enableCrossStreamContext, onCrossStreamContextChange } = props;
  return (
    <ConfigSubSection
      title="Queries"
      description={
        <ConfigDescriptionLink
          description="Additional options to customize your querying experience."
          suffix="loki/configure-loki-data-source/#queries"
          feature="query settings"
        />
      }
    >
      <InlineField
        label="Maximum lines"
        htmlFor="loki_config_maxLines"
        labelWidth={22}
        tooltip={
          <>
            Loki queries must contain a limit of the maximum number of lines returned (default: 1000). Increase this
            limit to have a bigger result set for ad-hoc analysis. Decrease this limit if your browser becomes sluggish
            when displaying the log results.
          </>
        }
      >
        <Input
          type="number"
          id="loki_config_maxLines"
          value={maxLines}
          onChange={(event: React.FormEvent<HTMLInputElement>) => onMaxLinedChange(event.currentTarget.value)}
          width={16}
          placeholder="1000"
          spellCheck={false}
        />
      </InlineField>
      <InlineField
        label="Enable cross-stream log context"
        htmlFor="loki_config_enableCrossStreamContext"
        labelWidth={22}
        tooltip="When enabled, the log context modal will show a toggle that allows users to view logs from ALL streams around a selected timestamp, similar to Kibana's 'Surrounding Documents' feature."
      >
        <InlineSwitch
          id="loki_config_enableCrossStreamContext"
          value={enableCrossStreamContext}
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            onCrossStreamContextChange(event.currentTarget.checked)
          }
        />
      </InlineField>
      {enableCrossStreamContext && (
        <Alert title="Cross-stream context: performance and cost warning" severity="warning">
          Enabling this feature allows users to run broad regex queries (e.g.{' '}
          <code>{'{service_name=~".+"}'}</code>) that scan ALL log streams around a given timestamp. On large Loki
          installations this can cause:
          <ul>
            <li>
              <strong>Slow queries</strong> &mdash; full-scan operations across all streams in the time window
            </li>
            <li>
              <strong>High resource usage</strong> &mdash; increased memory and CPU on Loki queriers
            </li>
            <li>
              <strong>Increased costs</strong> &mdash; higher read units / query costs on managed Loki or cloud storage
              backends
            </li>
          </ul>
          Consider limiting the <em>Maximum lines</em> setting above and advising users to keep the context time window
          narrow when using this feature.
        </Alert>
      )}
    </ConfigSubSection>
  );
};
