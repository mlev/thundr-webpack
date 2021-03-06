package threewks;

import com.threewks.thundr.gae.GaeModule;
import com.threewks.thundr.gae.objectify.ObjectifyModule;
import com.threewks.thundr.injection.BaseModule;
import com.threewks.thundr.injection.UpdatableInjectionContext;
import com.threewks.thundr.module.DependencyRegistry;
import com.threewks.thundr.route.Router;
import com.threewks.thundr.view.jsp.JspModule;
import threewks.controller.Routes;

public class ApplicationModule extends BaseModule {
	@Override
	public void requires(DependencyRegistry dependencyRegistry) {
		super.requires(dependencyRegistry);
		dependencyRegistry.addDependency(GaeModule.class);
		dependencyRegistry.addDependency(JspModule.class);
		dependencyRegistry.addDependency(ObjectifyModule.class);
	}

	@Override
	public void configure(UpdatableInjectionContext injectionContext) {
		super.configure(injectionContext);
	}

	@Override
	public void start(UpdatableInjectionContext injectionContext) {
		super.start(injectionContext);

		Router router = injectionContext.get(Router.class);
		Routes.addRoutes(router);
	}

}
