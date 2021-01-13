declare module 'gherkin-testcafe' {
  global {
    interface GherkinTestcafeRunner extends Runner {
      tags(tags: string[]): GherkinTestcafeRunner;
      parameterTypeRegistryFile(path: string): GherkinTestcafeRunner;
      dryRun(enabled: boolean): GherkinTestcafeRunner;
    }

    interface GherkinTestCafe extends TestCafe {
      /**
       * Creates the test runner that is used to configure and launch test tasks.
       */
      createRunner(): GherkinTestcafeRunner;

      /**
       * Creates the live mode test runner that is used to configure and launch test tasks.
       */
      createLiveModeRunner(): GherkinTestcafeRunner;
    }

    interface GherkinTestCafeFactory extends TestCafeFactory {
      (hostname?: string, port1?: number, port2?: number, sslOptions?: TlsOptions, developmentMode?: boolean): Promise<
        GherkinTestCafe
      >;
    }
  }

  const createTestCafe: GherkinTestCafeFactory;

  export * from 'testcafe';
  export default createTestCafe;
}

declare module 'cucumber' {
  import { t } from 'testcafe';

  export interface TableDefinition {
    /** Returns the table as a 2-D array. */
    raw(): string[][];

    /** Returns the table as a 2-D array, without the first row. */
    rows(): string[][];

    /** Returns an object where each row corresponds to an entry (first column is the key, second column is the value). */
    rowsHash(): { [firstCol: string]: string };

    /** Returns an array of objects where each row is converted to an object (column header is the key). */
    hashes(): Array<{ [colName: string]: string }>;
  }

  export type HookFunction = (testController: typeof t) => Promise<void>;
  export type GlobalHookFunction = (fixtureContext: { [key: string]: any }) => Promise<void>;

  export function After(code: HookFunction): void;
  export function After(options: string, code: HookFunction): void;
  export function AfterAll(code: GlobalHookFunction): void;
  export function Before(code: HookFunction): void;
  export function Before(options: string, code: HookFunction): void;
  export function BeforeAll(code: GlobalHookFunction): void;

  export type StepFunction = (
    testController: typeof t,
    parameters: any[],
    dataTable: TableDefinition | null
  ) => Promise<void>;

  export function Given(pattern: RegExp | string, code: StepFunction): void;
  export function When(pattern: RegExp | string, code: StepFunction): void;
  export function Then(pattern: RegExp | string, code: StepFunction): void;
}
