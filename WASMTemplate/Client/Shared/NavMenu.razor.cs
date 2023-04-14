using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace WASMTemplate.Client.Shared
{
    public partial class NavMenu
    {
        [Inject] private IJSRuntime? JS { get; set; }
    }
}