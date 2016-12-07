declare let require: any;

requireAll(require.context("./", true, /spec.ts$/));

function requireAll(requireContext: any): any {
    requireContext.keys().forEach(requireContext);
}
