using System.Web;
using System.Web.Mvc;

namespace TheCoffeeHouse_Home
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
