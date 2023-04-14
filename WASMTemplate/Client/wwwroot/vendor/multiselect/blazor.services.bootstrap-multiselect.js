function InitMultiSelectDropdown(elem, enableFiltering = false, filterPlaceholder = "") {
    $(elem).multiselect({
        enableFiltering: enableFiltering,
        filterPlaceholder: filterPlaceholder
    });
}