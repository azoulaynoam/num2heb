from setuptools import setup, find_packages

setup(
    name='numbers2hebrew',
    version='0.1.0',
    author='Noam Azoulay',
    author_email='noam@na-systems.com',
    description='A Function to convert a number into words in Hebrew',
    long_description=open('README.md').read(),
    long_description_content_type='text/markdown',
    url='https://github.com/azoulaynoam',
    packages=find_packages(),
    classifiers=[
        'Programming Language :: Python :: 3',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
    ],
    python_requires='>=3.6',
    install_requires=[
        # List your package dependencies here
    ],
)