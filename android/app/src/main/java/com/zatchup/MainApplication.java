package com.zatchup;

import android.app.Application;
import android.content.Context;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import io.invertase.firebase.firestore.ReactNativeFirebaseFirestorePackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.reactnativecommunity.clipboard.ClipboardPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.horcrux.svg.SvgPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.kishanjvaghela.cardview.RNCardViewPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.google.firebase.FirebaseApp;
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
import io.invertase.firebase.auth.ReactNativeFirebaseAuthPackage;
import com.BV.LinearGradient.LinearGradientPackage; // <--- This!
import com.facebook.react.shell.MainReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import com.reactnativecommunity.picker.RNCPickerPackage;
import java.util.Arrays;
import java.util.List;
import com.toyberman.RNSslPinningPackage;
import androidx.multidex.MultiDexApplication; // <-- ADD THIS IMPORT
public class MainApplication extends MultiDexApplication implements ReactApplication {
    
  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

          @Override
          protected List<ReactPackage> getPackages() {
              return Arrays.<ReactPackage>asList(
                      new MainReactPackage(),
            new ReactNativeFirebaseFirestorePackage(),
            new RNCWebViewPackage(),
            new ClipboardPackage(),
            new ReactVideoPackage(),
          //  new AsyncStoragePackage(),
            new SplashScreenReactPackage(),
            new SvgPackage(),
            new ReanimatedPackage(),
            new PickerPackage(),
            new RNDateTimePickerPackage(),
            new AsyncStoragePackage(),
            new RNCardViewPackage(),
            new RNGestureHandlerPackage(),
            new RNScreensPackage(),
            new RNCPickerPackage(),
            new SafeAreaContextPackage(),
            new ReactNativeFirebaseAppPackage(),
             new ReactNativeFirebaseAuthPackage(),
                      new LinearGradientPackage(),
                      new RNSslPinningPackage()
                      //new SplashScreenReactPackage()  //here
              );
          }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
     //
      FirebaseApp.initializeApp(this);
      SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.zatchup.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
