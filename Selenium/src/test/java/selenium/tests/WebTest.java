package selenium.tests;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;
import static org.junit.Assert.*;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import io.github.bonigarcia.wdm.ChromeDriverManager;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class WebTest
{
	private static WebDriver driver;
	
	@BeforeClass
	public static void setUp() throws Exception 
	{
		//driver = new HtmlUnitDriver();
		ChromeDriverManager.getInstance().setup();
		driver = new ChromeDriver();
	}
	
	@AfterClass
	public static void  tearDown() throws Exception
	{
		driver.close();
		driver.quit();
	}

	
//	@Test
//	public void googleExists() throws Exception
//	{
//		driver.get("http://www.google.com");
//        assertEquals("Google", driver.getTitle());		
//	}
	

//	@Test
//	public void Closed() throws Exception
//	{
//		driver.get("http://www.checkbox.io/studies.html");
//		
//		// http://geekswithblogs.net/Aligned/archive/2014/10/16/selenium-and-timing-issues.aspx
//		WebDriverWait wait = new WebDriverWait(driver, 30);
//		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@class='status']/span[.='CLOSED']")));
//		List<WebElement> spans = driver.findElements(By.xpath("//a[@class='status']/span[.='CLOSED']"));
//
//		assertNotNull(spans);
//		assertEquals(5, spans.size());
//	}

	@Test
	public void postMessage()
	{
		driver.get("https://se-projectworkspace.slack.com");
		
		// Wait until page loads and we can see a sign in button.
		WebDriverWait wait = new WebDriverWait(driver, 30);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("signin_btn")));

		// Find email and password fields.
		WebElement email = driver.findElement(By.id("email"));
		WebElement pw = driver.findElement(By.id("password"));

		// Type in our test user login info.
		//String passw = System.getenv("A1S2D3F4");
		String passw = "A1S2D3F4";
		System.out.println(passw);
		email.sendKeys("pramesh2@ncsu.edu");
		pw.sendKeys(passw);

		// Click
		WebElement signin = driver.findElement(By.id("signin_btn"));
		signin.click();

		// Wait until we go to general channel.
		wait.until(ExpectedConditions.titleContains("general"));

		// Switch to #bots channel and wait for it to load.
		driver.get("https://se-projectworkspace.slack.com/messages/selenium_testting2");
		wait.until(ExpectedConditions.titleContains("selenium_testting2"));

		// Type something
		WebElement messageBot = driver.findElement(By.id("msg_input"));
		assertNotNull(messageBot);
		
		Actions actions = new Actions(driver);
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("@taskbot create a new board");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();

		wait.withTimeout(10	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//input[@class='lfs_input']")));

		String msg = driver.findElement(By.xpath("//input[@class='lfs_input']")).getAttribute("placeholder");
		assertNotNull(msg);
		assertEquals(msg, "Select a template...");
		wait.withTimeout(10	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@class='lfs_input'][last()]")));
		WebElement wb = driver.findElement(By.xpath("//input[@class='lfs_input'][last()]"));
		wait.until(ExpectedConditions.elementToBeClickable(wb));
		System.out.println(wb.getAttribute("placeholder"));
		JavascriptExecutor js = (JavascriptExecutor)driver;
		js.executeScript("arguments[0].click()", wb);
		System.out.println(" WB Clicked");
		wait.withTimeout(5	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
//		actions.moveToElement(messageBot);
//		actions.click();
//		actions.build().perform();
		
		System.out.println(" Clicked outside");
		wait.withTimeout(5	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		WebElement wb2 = driver.findElement(By.xpath("//div[@class='lfs_item single'][last()]"));
		JavascriptExecutor js2 = (JavascriptExecutor)driver;
		js2.executeScript("arguments[0].click()", wb2);
		System.out.println(" WB2 Clicked");
		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@href='https://trello.com/b/8kvPgONp/swati2'][last()]")));
		WebElement wb3 = driver.findElement(By.xpath("//a[@href='https://trello.com/b/8kvPgONp/swati2'][last()]"));
		assertNotNull(wb3);
		
	}
	
	
	@Test
	public void testUseCase2()
	{
driver.get("https://se-projectworkspace.slack.com");
		
		// Wait until page loads and we can see a sign in button.
		WebDriverWait wait = new WebDriverWait(driver, 30);
		
		
		// Wait until page loads and we can see a sign in button.
		WebElement messageBot = driver.findElement(By.id("msg_input"));
		assertNotNull(messageBot);		
		Actions actions = new Actions(driver);
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("@taskbot task");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();

		wait.withTimeout(10	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//input[@class='lfs_input' and @placeholder='Select a list...']")));

		String msg = driver.findElement(
		By.xpath("//input[@class='lfs_input' and @placeholder='Select a list...']")).getAttribute("placeholder");
		assertNotNull(msg);
		assertEquals(msg, "Select a list...");
		wait.withTimeout(10	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@class='lfs_input' and @placeholder='Select a list...'][last()]")));
		WebElement wb = driver.findElement(By.xpath("//input[@class='lfs_input' and @placeholder='Select a list...'][last()]"));
		wait.until(ExpectedConditions.elementToBeClickable(wb));
		System.out.println(wb.getAttribute("placeholder"));
		JavascriptExecutor js = (JavascriptExecutor)driver;
		js.executeScript("arguments[0].click()", wb);
		System.out.println(" WB Clicked");
		wait.withTimeout(5	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
//		actions.moveToElement(messageBot);
//		actions.click();
//		actions.build().perform();
		
		System.out.println(" Clicked outside");
		wait.withTimeout(5	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		WebElement wb2 = driver.findElement(By.xpath("//div[@class='lfs_item single'][last()]"));
		JavascriptExecutor js2 = (JavascriptExecutor)driver;
		js2.executeScript("arguments[0].click()", wb2);
		System.out.println(" WB2 Clicked");
		wait.withTimeout(5	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		//wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@href='https://trello.com/b/8kvPgONp/swati2'][last()]")));
		WebElement wb3 = driver.findElement(By.xpath("//div[contains(., 'card has been successfully created')]"));
		//WebElement wb3 = driver.findElement(By.xpath("//div[@class='msg_inline_attachment_row' and contains(., 'card has been successfully created')]"));
		assertNotNull(wb3);
		
	}
	
	@Test
	public void testUseCase3()
	{
		WebDriverWait wait = new WebDriverWait(driver, 30);
				
		// Wait until page loads and we can see a sign in button.
		WebElement messageBot = driver.findElement(By.id("msg_input"));
		assertNotNull(messageBot);		
		Actions actions = new Actions(driver);
		actions.moveToElement(messageBot);
		actions.click().build().perform();
		actions.sendKeys("@taskbot attach");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();
		
		// checking for list dropdown first
		wait.withTimeout(10	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//input[@class='lfs_input' and @placeholder='Select a List...']")));

		
		String msg = driver.findElement(
		By.xpath("//input[@class='lfs_input' and @placeholder='Select a List...']")).getAttribute("placeholder");
		assertNotNull(msg);
		assertEquals(msg, "Select a List...");
		wait.withTimeout(10	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@class='lfs_input' and @placeholder='Select a List...'][last()]")));
		WebElement wb = driver.findElement(By.xpath("//input[@class='lfs_input' and @placeholder='Select a List...'][last()]"));
		wait.until(ExpectedConditions.elementToBeClickable(wb));
		System.out.println(wb.getAttribute("placeholder"));
		JavascriptExecutor js = (JavascriptExecutor)driver;
		js.executeScript("arguments[0].click()", wb);
		System.out.println("List dropdown Clicked");
		wait.withTimeout(5	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
//		actions.moveToElement(messageBot);
//		actions.click();
//		actions.build().perform();
		
		System.out.println(" Clicked outside");
		wait.withTimeout(5	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		WebElement wb2 = driver.findElement(By.xpath("//div[@class='lfs_item single'][last()]"));
		JavascriptExecutor js2 = (JavascriptExecutor)driver;
		js2.executeScript("arguments[0].click()", wb2);
		System.out.println(" List Clicked");
		wait.withTimeout(5	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		//wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@href='https://trello.com/b/8kvPgONp/swati2'][last()]")));
		WebElement wb3 = driver.findElement(By.xpath("//div[contains(., 'You have selected')]"));
		//WebElement wb3 = driver.findElement(By.xpath("//div[@class='msg_inline_attachment_row' and contains(., 'card has been successfully created')]"));
		assertNotNull(wb3);
		
		
		//checking for cards dropdown
		wait.withTimeout(10	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//input[@class='lfs_input' and @placeholder='Select a Card...'][last()]")));

		//wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@class='lfs_input' and @placeholder='Select a list...'][last()]")));
		String msg_card = driver.findElement(
		By.xpath("//input[@class='lfs_input' and @placeholder='Select a Card...']")).getAttribute("placeholder");
		assertNotNull(msg_card);
		assertEquals(msg_card, "Select a Card...");
		wait.withTimeout(10	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
	
		WebElement wbc = driver.findElement(By.xpath("//input[@class='lfs_input' and @placeholder='Select a Card...'][last()]"));
		wait.until(ExpectedConditions.elementToBeClickable(wbc));
		System.out.println(wbc.getAttribute("placeholder"));
		JavascriptExecutor jsc = (JavascriptExecutor)driver;
		jsc.executeScript("arguments[0].click()", wbc);
		System.out.println("Card dropdown Clicked");
		wait.withTimeout(5	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
//		actions.moveToElement(messageBot);
//		actions.click();
//		actions.build().perform();
		
		System.out.println(" Clicked outside");
		wait.withTimeout(5	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		WebElement wbc2 = driver.findElement(By.xpath("//div[@class='lfs_item single'][last()]"));
		JavascriptExecutor jsc2 = (JavascriptExecutor)driver;
		jsc2.executeScript("arguments[0].click()", wbc2);
		System.out.println("Card Clicked");
		wait.withTimeout(5	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		//wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@href='https://trello.com/b/8kvPgONp/swati2'][last()]")));
		WebElement wbc3 = driver.findElement(By.xpath("//div[contains(., 'selected whose')]"));
		//WebElement wb3 = driver.findElement(By.xpath("//div[@class='msg_inline_attachment_row' and contains(., 'card has been successfully created')]"));
		assertNotNull(wbc3);
		
		//enter URL
		wait.withTimeout(15	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("@taskbot Add this URL : http://www.google.com");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();
		
		wait.withTimeout(5	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		WebElement msgAttach = driver.findElement(By.xpath("//span[@class='message_body' and contains(., 'have attached the given URL')]"));
		assertNotNull(msgAttach);


	}
	
}